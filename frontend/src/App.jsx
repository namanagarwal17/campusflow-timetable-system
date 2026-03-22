import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import FacultyPage from "./pages/dashboard/FacultyPage";
import SubjectsPage from "./pages/dashboard/SubjectsPage";
import RoomsPage from "./pages/dashboard/RoomsPage";
import SectionsPage from "./pages/dashboard/SectionsPage";
import AssignmentsPage from "./pages/dashboard/AssignmentsPage";
import GeneratePage from "./pages/dashboard/GeneratePage";
import TimetablePage from "./pages/dashboard/TimeTablePage";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="subjects" element={<SubjectsPage />} />
          <Route path="rooms" element={<RoomsPage />} />
          <Route path="sections" element={<SectionsPage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="generate" element={<GeneratePage />} />
          <Route path="timetable" element={<TimetablePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;