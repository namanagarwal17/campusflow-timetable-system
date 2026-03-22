from sqlalchemy import Column, Integer, String
from database.db import Base

class Timetable(Base):
    __tablename__ = "timetable"

    id = Column(Integer, primary_key=True, index=True)
    section_name = Column(String, nullable=False)
    day = Column(String, nullable=False)
    slot = Column(String, nullable=False)
    subject_name = Column(String, nullable=False)
    faculty_name = Column(String, nullable=False)
    room_name = Column(String, nullable=False)