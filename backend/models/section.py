from sqlalchemy import Column, Integer, String
from database.db import Base

class Section(Base):
    __tablename__ = "sections"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    semester = Column(Integer, nullable=False)
    student_count = Column(Integer, nullable=False)