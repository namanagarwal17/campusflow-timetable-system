from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from utils.dependencies import get_db
from models.faculty import Faculty
from models.subject import Subject
from models.room import Room
from models.section import Section
from models.timetable import Timetable
from services.scheduler import generate_timetable_data

router = APIRouter(tags=["Timetable"])

@router.post("/generate-timetable")
def generate_timetable(db: Session = Depends(get_db)):
    faculty_list = db.query(Faculty).all()
    subjects = db.query(Subject).all()
    rooms = db.query(Room).all()
    sections = db.query(Section).all()

    if not faculty_list or not subjects or not rooms or not sections:
        raise HTTPException(
            status_code=400,
            detail="Faculty, subjects, rooms, and sections data required"
        )

    db.query(Timetable).delete()
    db.commit()

    timetable_data = generate_timetable_data(sections, subjects, faculty_list, rooms)

    for entry in timetable_data:
        timetable_entry = Timetable(**entry)
        db.add(timetable_entry)

    db.commit()

    return {"message": "Timetable generated successfully"}

@router.get("/timetable")
def get_timetable(
    section: str = None,
    faculty: str = None,
    room: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(Timetable)

    if section:
        query = query.filter(Timetable.section_name == section)
    if faculty:
        query = query.filter(Timetable.faculty_name == faculty)
    if room:
        query = query.filter(Timetable.room_name == room)

    return query.all()