from pydantic import BaseModel, EmailStr

class FacultyCreate(BaseModel):
    name: str
    email: EmailStr
    department: str

class FacultyOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    department: str

    class Config:
        from_attributes = True