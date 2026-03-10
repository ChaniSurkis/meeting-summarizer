from sqlalchemy import create_engine, Column, String, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Create database engine
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Meeting model - represents the meetings table in DB
class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(String, primary_key=True)
    filename = Column(String)
    status = Column(String)
    transcript = Column(Text, nullable=True)
    summary = Column(JSON, nullable=True)

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# Dependency - get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()