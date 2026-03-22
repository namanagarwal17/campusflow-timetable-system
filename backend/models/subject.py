from sqlalchemy import Column, Integer, String, Boolean
from database.db import Base

class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    hours_per_week = Column(Integer, nullable=False)
    type = Column(String, nullable=False)  # Theory / Lab
    lab_required = Column(Boolean, default=False)