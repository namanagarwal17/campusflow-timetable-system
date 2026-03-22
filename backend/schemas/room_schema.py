from pydantic import BaseModel

class RoomCreate(BaseModel):
    name: str
    capacity: int
    type: str

class RoomOut(BaseModel):
    id: int
    name: str
    capacity: int
    type: str

    class Config:
        from_attributes = True