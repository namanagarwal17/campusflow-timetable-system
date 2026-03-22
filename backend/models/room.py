from sqlalchemy import Column, Integer, String
from database.db import Base

class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    capacity = Column(Integer, nullable=False)
    type = Column(String, nullable=False)  # classroom / lab