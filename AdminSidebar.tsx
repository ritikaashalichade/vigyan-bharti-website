import {
  Award,
  Bell,
  BookOpenCheck,
  ChartNoAxesCombined,
  GraduationCap,
  LayoutDashboard,
  Settings,
  UserCheck,
  LogOut,
  Trophy,
  Users,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { fullName, getCurrentUser, logout, useStore } from "../../lib/store";

const adminMenu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Students",
    path: "/admin/students",
    icon: Users,
  },
  {
    name: "Mentors",
    path: "/admin/mentors",
    icon: UserCheck,
  },
  {
    name: "Mentor Allocation",
    path: "/admin/allocation",
    icon: UserCheck,
  },
  {
    name: "Assignments",
    path: "/admin/assignments",
    icon: BookOpenCheck,
  },
  {
    name: "Resources",
    path: "/admin/resources",
    icon: BookOpenCheck,
  },
  {
    name: "Notifications",
    path: "/admin/notifications",
    icon: Bell,
  },
  {
    name: "Scholarships",
    path: "/admin/scholarships",
    icon: GraduationCap,
  },
  {
    name: "Achievements",
    path: "/admin/achievements",
    icon: Award,
  },
  {
    name: "Leaderboard",
    path: "/admin/leaderboard",
    icon: Trophy,
  },
  {
    name: "Reports",
    path: "/admin/reports",
    icon: ChartNoAxesCombined,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

function AdminSidebar() {
  useStore();
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[#D8E8F7] bg-[#EAF4FF]">
      <div className="border-b border-[#D8E8F7] px-6 py-6">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="Srijan logo" className="h-11 w-11 shrink-0 rounded-full object-cover shadow-sm" />

          <div>
            <h1 className="text-lg font-bold text-[#23405F]">
              Srijan
            </h1>

            <p className="text-xs font-medium text-[#4A90E2]">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-5">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[#8CA0B5]">
          Administration
        </p>

        {adminMenu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
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
      </nav>

      <div className="border-t border-[#D8E8F7] p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#23405F]">
              {user ? fullName(user) : "Administrator"}
            </p>

            <p className="mt-1 text-xs text-[#6B7F95]">
              Administrator
            </p>
          </div>

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

export default AdminSidebar;