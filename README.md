# CampusFlow - Smart Campus Platform

Intelligent timetable generation for modern campuses with conflict-free scheduling, smart dashboards, and seamless academic planning.

## Features

- **Authentication**: Secure Login and Registration with role-based access (Admin, Student, Faculty).
- **Dashboard**: Interactive dashboards for managing campus operations.
- **Timetable Generation**: Automated conflict-free scheduling system.
- **Resource Management**: Manage faculty, subjects, rooms, and sections efficiently.
- **Premium UI**: Modern, responsive design with dark mode support and vibrant blue/green aesthetics.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons.
- **Backend**: FastAPI, SQLAlchemy (SQLite), Uvicorn.
- **Design**: Vanilla CSS with customized Tailwind tokens for a premium feel.

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js (v16+)
- npm or yarn

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd CampusFlow
   ```

2. **Backend Setup**:
   - Navigate to the `backend` directory.
   - Install dependencies:
     ```bash
     pip install -r requirement.txt
     ```
   - Running the server:
     ```bash
     uvicorn main:app --reload
     ```

3. **Frontend Setup**:
   - Navigate to `CampusFlow - Copy/frontend`.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Running the development server:
     ```bash
     npm run dev
     ```

## Project Structure

- `backend/`: FastAPI application, database models, routes, and services.
- `CampusFlow - Copy/frontend/`: React application with Vite, components, and pages.
- `database/`: Contains the SQLite database file.

## Authentication Demo

- **Admin Login**:
  - Username: `admin`
  - Password: `admin123`

---
Built with ❤️ for Modern Campuses.
