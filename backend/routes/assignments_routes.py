from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from utils.dependencies import get_db
from models.assignment import Assignment
from models.section import Section
from models.subject import Subject
from models.faculty import Faculty
from schemas.assignment_schema import AssignmentCreate, AssignmentResponse

router = APIRouter(prefix="/assignments", tags=["Assignments"])


@router.get("/", response_model=list[AssignmentResponse])
def get_assignments(db: Session = Depends(get_db)):
    return db.query(Assignment).all()


@router.post("/", response_model=AssignmentResponse)
def create_assignment(payload: AssignmentCreate, db: Session = Depends(get_db)):
    section = db.query(Section).filter(Section.id == payload.section_id).first()
    if not section:
        raise HTTPException(status_code=404, detail="Section not found")

    subject = db.query(Subject).filter(Subject.id == payload.subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    faculty = db.query(Faculty).filter(Faculty.id == payload.faculty_id).first()
    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")

    existing = (
        db.query(Assignment)
        .filter(
            Assignment.section_id == payload.section_id,
            Assignment.subject_id == payload.subject_id,
            Assignment.faculty_id == payload.faculty_id,
        )
        .first()
    )
    if existing:
        raise HTTPException(status_code=400, detail="Assignment already exists")

    new_assignment = Assignment(
        section_id=payload.section_id,
        subject_id=payload.subject_id,
        faculty_id=payload.faculty_id,
        weekly_hours=payload.weekly_hours,
        type=payload.type,
    )

    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)
    return new_assignment


@router.delete("/{assignment_id}")
def delete_assignment(assignment_id: int, db: Session = Depends(get_db)):
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    db.delete(assignment)
    db.commit()
    return {"message": "Assignment deleted successfully"}