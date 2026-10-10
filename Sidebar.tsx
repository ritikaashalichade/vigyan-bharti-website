import {
  BadgeCheck,
  Bell,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Search,
  BookOpen,
  Settings,
  Trophy,
  UserCircle,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { fullName, getCurrentUser, logout, useStore } from "../lib/store";

const menuItems = [
  { name: "Dashboard", path: "/student", icon: LayoutDashboard },
  { name: "Assignments", path: "/student/assignments", icon: FileText },
  { name: "Lectures", path: "/student/lectures", icon: BookOpen },
  { name: "My Doubts", path: "/student/doubts", icon: HelpCircle },
  { name: "My Submissions", path: "/student/submissions", icon: FileText },
  { name: "Results", path: "/student/results", icon: ClipboardCheck },
  { name: "Leaderboard", path: "/student/leaderboard", icon: Trophy },
  { name: "Notifications", path: "/student/notifications", icon: Bell },
];

function Sidebar() {
  useStore();
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[#D8E8F7] bg-[#EAF4FF]">
      
      {/* Logo */}
      <div className="border-b border-[#D8E8F7] px-6 py-6">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="Srijan logo" className="h-11 w-11 shrink-0 rounded-full object-cover shadow-sm" />

          <div>
            <h1 className="text-lg font-bold text-[#23405F]">
              Srijan
            </h1>

            <p className="text-xs font-medium text-[#4A90E2]">
             Student Portal
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pt-5">
        <div className="flex items-center gap-2 rounded-xl border border-[#D8E8F7] bg-white px-3 py-2.5">
          <Search
            size={17}
            className="text-[#6B7F95]"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-sm text-[#23405F] outline-none placeholder:text-[#8CA0B5]"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-5">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[#8CA0B5]">
          Main Menu
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#4A90E2] text-white shadow-sm"
                    : "text-[#46627F] hover:bg-[#DCEEFF] hover:text-[#4A90E2]"
                }`
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

        <div className="my-5 border-t border-[#D8E8F7]" />

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[#8CA0B5]">
          More
        </p>

        {/* My Profile */}
        <NavLink
          to="/student/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-[#4A90E2] text-white shadow-sm"
                : "text-[#46627F] hover:bg-[#DCEEFF] hover:text-[#4A90E2]"
            }`
          }
        >
          <UserCircle size={19} />
          <span>My Profile</span>
        </NavLink>

        {/* Scholarship */}
        <NavLink
          to="/student/scholarship"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-[#4A90E2] text-white shadow-sm"
                : "text-[#46627F] hover:bg-[#DCEEFF] hover:text-[#4A90E2]"
            }`
          }
        >
          <GraduationCap size={19} />
          <span>Scholarship</span>
        </NavLink>
        <NavLink
  to="/student/acknowledgements"
  className={({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-[#4A90E2] text-white shadow-sm"
        : "text-[#46627F] hover:bg-[#DCEEFF] hover:text-[#4A90E2]"
    }`
  }
>
  <BadgeCheck size={19} />
  <span>Acknowledgements</span>
</NavLink>

        {/* Settings */}
        <NavLink
          to="/student/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-[#4A90E2] text-white shadow-sm"
                : "text-[#46627F] hover:bg-[#DCEEFF] hover:text-[#4A90E2]"
            }`
          }
        >
          <Settings size={19} />
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* Student Profile */}
      <div className="border-t border-[#D8E8F7] p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
          
          {/* Avatar */}
          {user && <Avatar user={user} size={40} />}

          {/* Student Info */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#23405F]">
              {user ? fullName(user) : ""}
            </p>

            <p className="text-xs text-[#6B7F95]">
              Student
            </p>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="text-[#8CA0B5] transition hover:text-[#4A90E2]"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;