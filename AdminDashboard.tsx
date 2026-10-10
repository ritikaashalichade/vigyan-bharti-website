import {
  Bell,
  BookOpenCheck,
  ClipboardCheck,
  GraduationCap,
  IndianRupee,
  UserCheck,
  Users,
} from "lucide-react";
import { getUsers, roleOf, useStore } from "../../../lib/store";

function AdminDashboard() {
  useStore();
  const users = getUsers();
  const studentCount = users.filter((u) => roleOf(u) === "student").length;
  const activeMentors = users.filter(
    (u) => roleOf(u) === "mentor" && (u.status ?? "Active") === "Active",
  ).length;

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-3xl font-bold text-[#23405F]">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-[#6B7F95]">
          Monitor students, mentors, activities and internship progress.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <Users size={22} className="text-[#4A90E2]" />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Total Students
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {studentCount}
          </p>

          <p className="mt-2 text-xs text-emerald-600">
            Registered students
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <UserCheck size={22} className="text-[#4A90E2]" />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Active Mentors
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {activeMentors}
          </p>

          <p className="mt-2 text-xs text-[#6B7F95]">
            Currently active
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <BookOpenCheck size={22} className="text-[#4A90E2]" />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Active Activities
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            36
          </p>

          <p className="mt-2 text-xs text-[#6B7F95]">
            Assignments & tasks
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <ClipboardCheck size={22} className="text-[#4A90E2]" />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Pending Reviews
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            18
          </p>

          <p className="mt-2 text-xs text-amber-600">
            Need attention
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-bold text-[#23405F]">
            Internship Progress
          </h2>

          <p className="mt-1 text-sm text-[#6B7F95]">
            Overall system performance
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-[#46627F]">
                  Activities Completed
                </span>

                <span className="font-semibold text-[#23405F]">
                  78%
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-[#EAF4FF]">
                <div
                  className="h-full rounded-full bg-[#4A90E2]"
                  style={{ width: "78%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="text-[#46627F]">
                  Evaluations Completed
                </span>

                <span className="font-semibold text-[#23405F]">
                  84%
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-[#EAF4FF]">
                <div
                  className="h-full rounded-full bg-[#4A90E2]"
                  style={{ width: "84%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="text-[#46627F]">
                  Mentor Allocation
                </span>

                <span className="font-semibold text-[#23405F]">
                  92%
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-[#EAF4FF]">
                <div
                  className="h-full rounded-full bg-[#4A90E2]"
                  style={{ width: "92%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#23405F]">
            Quick Statistics
          </h2>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-[#F8FBFF] p-4">
              <div className="flex items-center gap-3">
                <Bell size={19} className="text-[#4A90E2]" />
                <span className="text-sm text-[#46627F]">
                  Notifications
                </span>
              </div>

              <span className="font-bold text-[#23405F]">
                14
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#F8FBFF] p-4">
              <div className="flex items-center gap-3">
                <GraduationCap
                  size={19}
                  className="text-[#4A90E2]"
                />

                <span className="text-sm text-[#46627F]">
                  Scholarships
                </span>
              </div>

              <span className="font-bold text-[#23405F]">
                86
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#F8FBFF] p-4">
              <div className="flex items-center gap-3">
                <IndianRupee
                  size={19}
                  className="text-[#4A90E2]"
                />

                <span className="text-sm text-[#46627F]">
                  Pending Documents
                </span>
              </div>

              <span className="font-bold text-[#23405F]">
                11
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#D8E8F7] bg-white shadow-sm">
        <div className="border-b border-[#D8E8F7] px-6 py-5">
          <h2 className="text-lg font-bold text-[#23405F]">
            Recent Activity
          </h2>
        </div>

        <div className="divide-y divide-[#D8E8F7]">
          <div className="flex items-center gap-4 px-6 py-4">
            <div className="rounded-xl bg-[#DCEEFF] p-3">
              <Users size={19} className="text-[#4A90E2]" />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#23405F]">
                New student registered
              </p>

              <p className="mt-1 text-xs text-[#6B7F95]">
                10 minutes ago
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-4">
            <div className="rounded-xl bg-[#DCEEFF] p-3">
              <BookOpenCheck
                size={19}
                className="text-[#4A90E2]"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#23405F]">
                New assignment created
              </p>

              <p className="mt-1 text-xs text-[#6B7F95]">
                35 minutes ago
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-4">
            <div className="rounded-xl bg-[#DCEEFF] p-3">
              <Bell size={19} className="text-[#4A90E2]" />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#23405F]">
                New announcement published
              </p>

              <p className="mt-1 text-xs text-[#6B7F95]">
                1 hour ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;