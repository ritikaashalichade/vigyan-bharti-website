import {
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { fullName, getCurrentUser, useStore } from "../lib/store";

function Topbar() {
  useStore();
  const user = getCurrentUser();
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#D8E8F7] bg-white px-8">
      
      {/* Left */}
      <div>
        <h2 className="text-xl font-bold text-[#23405F]">
          Student Dashboard
        </h2>

        <p className="text-sm text-[#6B7F95]">
          Welcome back! Continue your learning journey.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        
        {/* Search */}
        <div className="hidden items-center gap-2 rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-3 py-2 md:flex">
          <Search
            size={17}
            className="text-[#6B7F95]"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-36 bg-transparent text-sm text-[#23405F] outline-none placeholder:text-[#8CA0B5]"
          />
        </div>

        {/* Notification */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#D8E8F7] bg-white text-[#46627F] transition hover:bg-[#DCEEFF] hover:text-[#4A90E2]"
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#4A90E2]" />
        </button>

        {/* Profile */}
        <Link
          to="/student/profile"
          title="My profile"
          className="flex items-center gap-3 border-l border-[#D8E8F7] pl-5"
        >
          {user && <Avatar user={user} size={40} />}

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-[#23405F]">
              {user ? fullName(user) : ""}
            </p>

            <p className="text-xs text-[#6B7F95]">
              Student
            </p>
          </div>

          <ChevronDown
            size={17}
            className="text-[#8CA0B5]"
          />
        </Link>
      </div>
    </header>
  );
}

export default Topbar;