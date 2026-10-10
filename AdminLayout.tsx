import { Bell, ChevronDown } from "lucide-react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { fullName, getCurrentUser, useStore } from "../../lib/store";

function AdminLayout() {
  useStore();
  const user = getCurrentUser();

  return (
    <div className="min-h-screen bg-[#F8FBFF]">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Area */}
      <div className="ml-64 min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#D8E8F7] bg-white px-8">
          <div>
            <p className="text-lg font-bold text-[#23405F]">
              Administration
            </p>

            <p className="mt-1 text-xs text-[#8CA0B5]">
              Srijan – Science Talent Search
            </p>
          </div>

          <div className="flex items-center gap-5">
            {/* Notification */}
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#D8E8F7] text-[#46627F] hover:bg-[#DCEEFF] hover:text-[#4A90E2]"
            >
              <Bell size={19} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#4A90E2]" />
            </button>

            {/* Divider */}
            <div className="h-8 w-px bg-[#D8E8F7]" />

            {/* Admin Profile */}
            <button
              type="button"
              className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-[#F8FBFF]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DCEEFF] font-semibold text-[#4A90E2]">
                {user ? user.first.charAt(0).toUpperCase() : "A"}
              </div>

              <div className="hidden text-left md:block">
                <p className="text-sm font-semibold text-[#23405F]">
                  {user ? fullName(user) : "Administrator"}
                </p>

                <p className="text-xs text-[#6B7F95]">
                  Admin
                </p>
              </div>

              <ChevronDown
                size={17}
                className="text-[#8CA0B5]"
              />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;