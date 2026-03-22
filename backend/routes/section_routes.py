from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from utils.dependencies import get_db
from models.section import Section
from schemas.section_schema import SectionCreate

router = APIRouter(prefix="/sections", tags=["Sections"])


@router.post("/")
def create_section(section: SectionCreate, db: Session = Depends(get_db)):
    # 🔥 Duplicate check (optional but good)
    existing = db.query(Section).filter(Section.name == section.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Section already exists")

    new_section = Section(
        name=section.name,
        semester=section.semester,
        student_count=section.student_count,
    )

    db.add(new_section)
    db.commit()
    db.refresh(new_section)

    return new_section


@router.get("/")
def get_sections(db: Session = Depends(get_db)):
    return db.query(Section).all()


@router.delete("/{section_id}")
def delete_section(section_id: int, db: Session = Depends(get_db)):
    section = db.query(Section).filter(Section.id == section_id).first()

    if not section:
        raise HTTPException(status_code=404, detail="Section not found")

    db.delete(section)
    db.commit()

    return {"message": "Section deleted successfully"}