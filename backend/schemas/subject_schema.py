from pydantic import BaseModel

class SubjectCreate(BaseModel):
    name: str
    hours_per_week: int
    type: str
    lab_required: bool = False

class SubjectOut(BaseModel):
    id: int
    name: str
    hours_per_week: int
    type: str
    lab_required: bool

    class Config:
        from_attributes = True