import { useState } from "react";
import {
  CheckCircle2,
  GraduationCap,
  UserCheck,
  Users,
} from "lucide-react";
import {
  findBySid,
  fullName,
  getUsers,
  roleOf,
  updateUser,
  useStore,
} from "../../../lib/store";

function Allocation() {
  useStore();

  const students = getUsers().filter((u) => roleOf(u) === "student");
  const mentors = getUsers().filter(
    (u) => roleOf(u) === "mentor" && (u.status ?? "Active") === "Active",
  );
  const allocated = students.filter((s) => s.mentorSid).length;
  const rate = students.length
    ? Math.round((allocated / students.length) * 100)
    : 0;

  const [student, setStudent] = useState("");
  const [mentor, setMentor] = useState("");
  const [message, setMessage] = useState("");

  const handleAllocate = () => {
    if (!student || !mentor) {
      setMessage("Please select both student and mentor.");
      return;
    }

    const target = students.find((s) => s.email === student);
    const chosen = mentors.find((m) => m.sid === mentor);

    if (!target || !chosen) {
      setMessage("Could not find that student or mentor.");
      return;
    }

    const error = updateUser(target.email, { mentorSid: chosen.sid });

    if (error) {
      setMessage(error);
      return;
    }

    setMessage(`${fullName(target)} successfully assigned to ${fullName(chosen)}.`);
    setStudent("");
    setMentor("");
  };

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-3xl font-bold text-[#23405F]">
          Mentor Allocation
        </h1>

        <p className="mt-1 text-[#6B7F95]">
          Assign students to their mentors.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <Users size={22} className="text-[#4A90E2]" />

          <p className="mt-4 text-sm text-[#6B7F95]">
            Students
          </p>

          <p className="text-3xl font-bold text-[#23405F]">
            {students.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <UserCheck size={22} className="text-[#4A90E2]" />

          <p className="mt-4 text-sm text-[#6B7F95]">
            Mentors
          </p>

          <p className="text-3xl font-bold text-[#23405F]">
            {mentors.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <CheckCircle2
            size={22}
            className="text-[#4A90E2]"
          />

          <p className="mt-4 text-sm text-[#6B7F95]">
            Allocation Rate
          </p>

          <p className="text-3xl font-bold text-[#23405F]">
            {rate}%
          </p>
        </div>
      </div>

      <div className="max-w-2xl rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#DCEEFF] p-3">
            <GraduationCap
              size={22}
              className="text-[#4A90E2]"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#23405F]">
              Assign Mentor
            </h2>

            <p className="text-sm text-[#6B7F95]">
              Select a student and mentor.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#23405F]">
              Student
            </label>

            <select
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F]"
            >
              <option value="">Select Student</option>

              {students.map((s) => (
                <option key={s.email} value={s.email}>
                  {fullName(s)} — {findBySid(s.mentorSid) ? `now with ${fullName(findBySid(s.mentorSid)!)}` : "no mentor yet"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#23405F]">
              Mentor
            </label>

            <select
              value={mentor}
              onChange={(e) => setMentor(e.target.value)}
              className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F]"
            >
              <option value="">Select Mentor</option>

              {mentors.map((m) => (
                <option key={m.sid} value={m.sid}>
                  {fullName(m)}
                </option>
              ))}
            </select>
          </div>

          {message && (
            <div className="rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-600">
              {message}
            </div>
          )}

          <button
            type="button"
            onClick={handleAllocate}
            className="w-full rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white hover:bg-[#3B7FCB]"
          >
            Assign Mentor
          </button>
        </div>
      </div>
    </div>
  );
}

export default Allocation;