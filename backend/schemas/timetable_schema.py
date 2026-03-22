from pydantic import BaseModel

class TimetableEntryOut(BaseModel):
    id: int
    section_name: str
    day: str
    slot: str
    subject_name: str
    faculty_name: str
    room_name: str

    class Config:
        from_attributes = True

class TimetableGenerateResponse(BaseModel):
    message: str