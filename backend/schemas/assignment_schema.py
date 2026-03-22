from pydantic import BaseModel


class AssignmentCreate(BaseModel):
    section_id: int
    subject_id: int
    faculty_id: int
    weekly_hours: int
    type: str


class AssignmentResponse(BaseModel):
    id: int
    section_id: int
    subject_id: int
    faculty_id: int
    weekly_hours: int
    type: str

    class Config:
        from_attributes = True