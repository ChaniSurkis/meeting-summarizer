from fastapi import APIRouter, UploadFile, File, BackgroundTasks, Depends
from sqlalchemy.orm import Session
from database import Meeting, get_db
from services.whisper import transcribe_audio
from services.summarizer import summarize_transcript
import shutil
import os
import uuid

router = APIRouter(prefix="/meetings", tags=["meetings"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def process_audio(meeting_id: str, file_path: str):
    """Background task: transcribe audio and summarize with GPT"""
    db = next(get_db())
    
    try:
        # Update status to processing
        meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
        meeting.status = "processing"
        db.commit()

        # Transcribe audio with Whisper
        transcript = transcribe_audio(file_path)

        # Summarize transcript with GPT
        summary = summarize_transcript(transcript)

        # Save results to database
        meeting.transcript = transcript
        meeting.summary = summary
        meeting.status = "done"
        db.commit()

    except Exception as e:
        # If anything fails - update status to failed
        meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
        meeting.status = "failed"
        meeting.summary = {"error": str(e)}
        db.commit()

    finally:
        db.close()

@router.post("/upload-audio")
async def upload_audio(
    file: UploadFile = File(...),
    background_tasks: BackgroundTasks = BackgroundTasks(),
    db: Session = Depends(get_db)
):
    # Save uploaded file to disk
    file_path = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Create meeting record in database
    meeting_id = str(uuid.uuid4())
    meeting = Meeting(
        id=meeting_id,
        filename=file.filename,
        status="pending"
    )
    db.add(meeting)
    db.commit()

    # Process audio in background
    background_tasks.add_task(process_audio, meeting_id, file_path)

    return {
        "meeting_id": meeting_id,
        "status": "pending",
        "message": "Processing started, use GET /meetings/{id} to check status"
    }

@router.get("/{meeting_id}")
async def get_meeting(meeting_id: str, db: Session = Depends(get_db)):
    """Get meeting results by ID"""
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    
    if not meeting:
        return {"error": "Meeting not found"}
    
    return {
        "id": meeting.id,
        "filename": meeting.filename,
        "status": meeting.status,
        "transcript": meeting.transcript,
        "summary": meeting.summary
    }

@router.get("/")
async def get_all_meetings(db: Session = Depends(get_db)):
    """Get all meetings"""
    meetings = db.query(Meeting).all()
    return [
        {
            "id": m.id,
            "filename": m.filename,
            "status": m.status
        }
        for m in meetings
    ]