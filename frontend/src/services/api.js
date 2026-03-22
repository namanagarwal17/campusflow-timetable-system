import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// -------- Faculty APIs --------
export async function getFaculty() {
  const res = await api.get("/faculty/");
  return res.data;
}

export async function createFaculty(payload) {
  const res = await api.post("/faculty/", payload);
  return res.data;
}

export async function deleteFaculty(id) {
  const res = await api.delete(`/faculty/${id}`);
  return res.data;
}

// -------- Subjects APIs --------
export async function getSubjects() {
  const res = await api.get("/subjects/");
  return res.data;
}

export async function createSubject(payload) {
  const res = await api.post("/subjects/", payload);
  return res.data;
}

export async function deleteSubject(id) {
  const res = await api.delete(`/subjects/${id}`);
  return res.data;
}

// -------- Rooms APIs --------
export async function getRooms() {
  const res = await api.get("/rooms/");
  return res.data;
}

export async function createRoom(payload) {
  const res = await api.post("/rooms/", payload);
  return res.data;
}

export async function deleteRoom(id) {
  const res = await api.delete(`/rooms/${id}`);
  return res.data;
}

// -------- Sections APIs --------
export async function getSections() {
  const res = await api.get("/sections/");
  return res.data;
}

export async function createSection(payload) {
  const res = await api.post("/sections/", payload);
  return res.data;
}

export async function deleteSection(id) {
  const res = await api.delete(`/sections/${id}`);
  return res.data;
}

// -------- Assignments APIs --------
export async function getAssignments() {
  const res = await api.get("/assignments/");
  return res.data;
}

export async function createAssignment(payload) {
  const res = await api.post("/assignments/", payload);
  return res.data;
}

export async function deleteAssignment(id) {
  const res = await api.delete(`/assignments/${id}`);
  return res.data;
}

// -------- Timetable APIs --------
export async function generateTimetable() {
  const res = await api.post("/generate-timetable/");
  return res.data;
}

export async function getTimetable() {
  const res = await api.get("/timetable/");
  return res.data;
}

export default api;