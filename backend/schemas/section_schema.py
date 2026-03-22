from pydantic import BaseModel

class SectionCreate(BaseModel):
    name: str
    semester: int
    student_count: int

class SectionOut(BaseModel):
    id: int
    name: str
    semester: int
    student_count: int

    class Config:
        from_attributes = True