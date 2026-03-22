from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from utils.dependencies import get_db
from models.faculty import Faculty
from schemas.faculty_schema import FacultyCreate

router = APIRouter(prefix="/faculty", tags=["Faculty"])

@router.post("/")
def create_faculty(faculty: FacultyCreate, db: Session = Depends(get_db)):
    new_faculty = Faculty(**faculty.dict())
    db.add(new_faculty)
    db.commit()
    db.refresh(new_faculty)
    return new_faculty

@router.get("/")
def get_faculty(db: Session = Depends(get_db)):
    return db.query(Faculty).all()

@router.delete("/{faculty_id}")
def delete_faculty(faculty_id: int, db: Session = Depends(get_db)):
    faculty = db.query(Faculty).filter(Faculty.id == faculty_id).first()
    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")

    db.delete(faculty)
    db.commit()
    return {"message": "Faculty deleted successfully"}