from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.db import Base, engine

import models

from routes.auth_routes import router as auth_router
from routes.faculty_routes import router as faculty_router
from routes.subject_routes import router as subject_router
from routes.room_routes import router as room_router
from routes.section_routes import router as section_router
from routes.assignments_routes import router as assignments_router
from routes.timetable_routes import router as timetable_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="CampusFlow Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(faculty_router)
app.include_router(subject_router)
app.include_router(room_router)
app.include_router(section_router)
app.include_router(assignments_router)
app.include_router(timetable_router)

@app.get("/")
def home():
    return {"message": "CampusFlow backend is running"}