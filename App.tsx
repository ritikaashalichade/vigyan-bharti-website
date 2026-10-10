import type { ReactNode } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Allocation from "./pages/Admin/Allocation/Allocation";
// Admin Layout
import AdminLayout from "./components/Admin/AdminLayout";
import Mentors from "./pages/Admin/Mentors/Mentors";
// Student Dashboard
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminSettings from "./pages/Admin/Settings/AdminSettings";
// Admin Dashboard
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";

// Admin - Students
import AdminReports from "./pages/Admin/Reports/AdminReports";
import Students from "./pages/Admin/Students/Students";

// Member 2 - Doubts
import Doubts from "./pages/Doubts/Doubts";
import QueryDetails from "./pages/Doubts/QueryDetails";
import RaiseQuery from "./pages/RaiseQuery/RaiseQuery";

// Member 2 - Submissions
import Submissions from "./pages/Submissions/Submissions";
import SubmissionDetails from "./pages/Submissions/SubmissionDetails";

// Member 2 - Results
import Results from "./pages/Results/Results";

// Member 2 - Notifications
import Notifications from "./pages/Notifications/Notifications";

// Member 2 - Scholarship
import Scholarship from "./pages/Scholarship/Scholarship";
import AdminScholarships from "./pages/Admin/Scholarships/AdminScholarships";
// Member 2 - Acknowledgements
import Acknowledgements from "./pages/Acknowledgements/Acknowledgements";
import AdminAchievements from "./pages/Admin/Achievements/AdminAchievements";
// Member 2 - Settings
import Settings from "./pages/Settings/Settings";
import AdminNotifications from "./pages/Admin/Notifications/AdminNotifications";
// Member 1 - Assignments
import Assignments from "./pages/Assignments/Assignments";
import AssignmentDetails from "./pages/AssignmentDetails/AssignmentDetails";
import Resources from "./pages/Admin/Resources/Resources";
// Member 1 - Lectures
import Lectures from "./pages/Lectures/Lectures";
import AdminAssignments from "./pages/Admin/Assignments/AdminAssignments";

// Public pages + mentor portal + shared helpers
import Landing from "./pages/Public/Landing";
import Login from "./pages/Public/Login";
import Register from "./pages/Public/Register";
import Forgot from "./pages/Public/Forgot";
import About from "./pages/Public/About";
import MentorPortal from "./pages/Mentor/MentorPortal";
import Leaderboard from "./components/Leaderboard";
import Profile from "./pages/Profile/Profile";
import RequireRole from "./components/RequireRole";
import { getCurrentUser, homePathFor, roleOf, useStore } from "./lib/store";

function StudentLayout() {
  return (
    <div className="min-h-screen bg-[#F8FBFF]">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Topbar />

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// The public pages ask for a "go(route)" helper; this connects it to the router.
function useGo() {
  const navigate = useNavigate();

  return (route: string, notice?: string) => {
    if (route === "dashboard") {
      const user = getCurrentUser();
      navigate(user ? homePathFor(roleOf(user)) : "/login");
      return;
    }

    navigate(route === "home" ? "/" : `/${route}`, {
      state: notice ? { notice } : undefined,
    });
  };
}

// Logged-in people skip the login / register pages and go straight to their own home.
function GuestOnly({ children }: { children: ReactNode }) {
  useStore();
  const user = getCurrentUser();

  if (user) return <Navigate to={homePathFor(roleOf(user))} replace />;

  return <>{children}</>;
}

function LandingPage() {
  return <Landing go={useGo()} />;
}

function AboutPage() {
  return <About go={useGo()} />;
}

function LoginPage() {
  const go = useGo();
  const location = useLocation();
  const notice = (location.state as { notice?: string } | null)?.notice;

  return (
    <GuestOnly>
      <Login go={go} notice={notice} />
    </GuestOnly>
  );
}

function RegisterPage() {
  return (
    <GuestOnly>
      <Register go={useGo()} />
    </GuestOnly>
  );
}

function ForgotPage() {
  return (
    <GuestOnly>
      <Forgot go={useGo()} />
    </GuestOnly>
  );
}

function MentorPage() {
  return <MentorPortal go={useGo()} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =====================================
            PUBLIC WEBSITE
        ====================================== */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot" element={<ForgotPage />} />

        {/* =====================================
            STUDENT MODULE  (students only)
        ====================================== */}
        <Route path="/student" element={<RequireRole role="student" />}>
          <Route element={<StudentLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />

            {/* Doubts */}
            <Route path="doubts" element={<Doubts />} />
            <Route path="query-details/:id" element={<QueryDetails />} />
            <Route path="raise-query" element={<RaiseQuery />} />

            {/* Submissions */}
            <Route path="submissions" element={<Submissions />} />
            <Route path="submission-details/:id" element={<SubmissionDetails />} />

            {/* Results, notifications, scholarship, acknowledgements, settings */}
            <Route path="results" element={<Results />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="scholarship" element={<Scholarship />} />
            <Route path="acknowledgements" element={<Acknowledgements />} />
            <Route path="settings" element={<Settings />} />

            {/* Assignments & lectures */}
            <Route path="assignments" element={<Assignments />} />
            <Route path="assignments/:id" element={<AssignmentDetails />} />
            <Route path="lectures" element={<Lectures />} />
            <Route path="leaderboard" element={<Leaderboard />} />
          </Route>
        </Route>

        {/* =====================================
            MENTOR MODULE  (mentors only)
        ====================================== */}
        <Route path="/mentor" element={<RequireRole role="mentor" />}>
          <Route index element={<MentorPage />} />
        </Route>

        {/* =====================================
            ADMIN MODULE  (admins only, separate panel)
        ====================================== */}
        <Route path="/admin" element={<RequireRole role="admin" />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="mentors" element={<Mentors />} />
            <Route path="allocation" element={<Allocation />} />
            <Route path="assignments" element={<AdminAssignments />} />
            <Route path="resources" element={<Resources />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="scholarships" element={<AdminScholarships />} />
            <Route path="achievements" element={<AdminAchievements />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* Unknown address */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
