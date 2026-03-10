from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable, ListItem
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import io
import os

def register_hebrew_font():
    """Register a Hebrew-supporting font"""
    # Try to use Arial from Windows fonts (supports Hebrew)
    font_path = "C:/Windows/Fonts/arial.ttf"
    if os.path.exists(font_path):
        pdfmetrics.registerFont(TTFont('Hebrew', font_path))
        return 'Hebrew'
    return 'Helvetica'  # fallback

def generate_meeting_pdf(meeting: dict) -> bytes:
    """Generate a PDF report from meeting data"""
    
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4,
                           rightMargin=2*cm, leftMargin=2*cm,
                           topMargin=2*cm, bottomMargin=2*cm)
    
    font_name = register_hebrew_font()
    
    # Custom styles with Hebrew font
    title_style = ParagraphStyle('Title',
                                  fontName=font_name,
                                  fontSize=22, textColor=colors.HexColor('#6B21A8'),
                                  spaceAfter=12)
    
    heading_style = ParagraphStyle('Heading',
                                    fontName=font_name,
                                    fontSize=14, textColor=colors.HexColor('#7E22CE'),
                                    spaceBefore=16, spaceAfter=8)
    
    body_style = ParagraphStyle('Body',
                                 fontName=font_name,
                                 fontSize=11, leading=18, spaceAfter=8)
    
    small_style = ParagraphStyle('Small',
                                  fontName=font_name,
                                  fontSize=10, textColor=colors.grey)
    
    elements = []
    summary = meeting.get('summary', {})
    
    # Title
    elements.append(Paragraph("Meeting Summary", title_style))
    elements.append(Paragraph(f"File: {meeting.get('filename', '')}", body_style))
    elements.append(Spacer(1, 0.5*cm))
    
    # Summary
    elements.append(Paragraph("Summary", heading_style))
    elements.append(Paragraph(summary.get('summary', ''), body_style))
    
    # Key Points
    elements.append(Paragraph("Key Points", heading_style))
    key_points = summary.get('key_points', [])
    items = [ListItem(Paragraph(point, body_style)) for point in key_points]
    elements.append(ListFlowable(items, bulletType='bullet', leftIndent=20))
    
    # Action Items
    elements.append(Paragraph("Action Items", heading_style))
    action_items = summary.get('action_items', [])
    for item in action_items:
        elements.append(Paragraph(f"• {item.get('task', '')}", body_style))
        elements.append(Paragraph(f"  Owner: {item.get('owner', '')}", small_style))
    
    # Transcript
    elements.append(Paragraph("Full Transcript", heading_style))
    elements.append(Paragraph(meeting.get('transcript', ''), body_style))
    
    doc.build(elements)
    buffer.seek(0)
    return buffer.read()