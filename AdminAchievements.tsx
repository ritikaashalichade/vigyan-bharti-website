import { useMemo, useState } from "react";
import {
  Award,
  CheckCircle2,
  Eye,
  Medal,
  Plus,
  Search,
  X,
} from "lucide-react";

type Achievement = {
  id: string;
  student: string;
  title: string;
  type: "Achievement" | "Certificate";
  date: string;
  status: "Verified" | "Pending";
};

const initialAchievements: Achievement[] = [
  {
    id: "ACH-7001",
    student: "Amisha Agarwal",
    title: "SRIJAN Internship Completion",
    type: "Certificate",
    date: "30 Sep 2026",
    status: "Verified",
  },
  {
    id: "ACH-7002",
    student: "Priya Sharma",
    title: "Best Performance in Data Structures",
    type: "Achievement",
    date: "28 Sep 2026",
    status: "Verified",
  },
  {
    id: "ACH-7003",
    student: "Ananya Verma",
    title: "Research Activity Participation",
    type: "Achievement",
    date: "26 Sep 2026",
    status: "Pending",
  },
];

function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(
    initialAchievements,
  );

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "All" | "Achievement" | "Certificate"
  >("All");

  const [selected, setSelected] =
    useState<Achievement | null>(null);

  const [showForm, setShowForm] = useState(false);

  const [student, setStudent] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] =
    useState<"Achievement" | "Certificate">("Achievement");

  const filteredAchievements = useMemo(() => {
    return achievements.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        item.student.toLowerCase().includes(searchText) ||
        item.title.toLowerCase().includes(searchText);

      const matchesFilter =
        filter === "All" || item.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [achievements, search, filter]);

  const verifiedCount = achievements.filter(
    (item) => item.status === "Verified",
  ).length;

  const certificateCount = achievements.filter(
    (item) => item.type === "Certificate",
  ).length;

  const handleOpenForm = () => {
    setSelected(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setStudent("");
    setTitle("");
    setType("Achievement");
  };

  const handleAddRecord = () => {
    if (!student.trim()) {
      alert("Please enter student name.");
      return;
    }

    if (!title.trim()) {
      alert("Please enter achievement title.");
      return;
    }

    const newRecord: Achievement = {
      id: `ACH-${7001 + achievements.length}`,
      student: student.trim(),
      title: title.trim(),
      type,
      date: "05 Oct 2026",
      status: "Verified",
    };

    setAchievements((current) => [
      newRecord,
      ...current,
    ]);

    handleCloseForm();
  };

  return (
    <div className="space-y-7">

      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#23405F]">
            Achievements & Certificates
          </h1>

          <p className="mt-1 text-[#6B7F95]">
            Manage student achievements and internship certificates.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white transition hover:bg-[#3B7FCB]"
        >
          <Plus size={18} />
          Add Record
        </button>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <Award
            size={22}
            className="text-[#4A90E2]"
          />

          <p className="mt-4 text-sm text-[#6B7F95]">
            Total Records
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {achievements.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <Medal
            size={22}
            className="text-[#4A90E2]"
          />

          <p className="mt-4 text-sm text-[#6B7F95]">
            Certificates
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {certificateCount}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <CheckCircle2
            size={22}
            className="text-[#4A90E2]"
          />

          <p className="mt-4 text-sm text-[#6B7F95]">
            Verified
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {verifiedCount}
          </p>
        </div>

      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">

        <div className="flex w-full items-center gap-2 rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 md:max-w-md">
          <Search
            size={18}
            className="text-[#6B7F95]"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student or achievement..."
            className="w-full bg-transparent text-sm text-[#23405F] outline-none placeholder:text-[#8CA0B5]"
          />
        </div>

        <div className="flex gap-2">
          {(["All", "Achievement", "Certificate"] as const).map(
            (option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
                  filter === option
                    ? "bg-[#4A90E2] text-white"
                    : "border border-[#D8E8F7] bg-white text-[#4A90E2] hover:bg-[#DCEEFF]"
                }`}
              >
                {option}
              </button>
            ),
          )}
        </div>
      </div>

      {/* RECORDS */}
      <div className="space-y-4">

        {filteredAchievements.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-[#DCEEFF] p-3">
                  {item.type === "Certificate" ? (
                    <Medal
                      size={22}
                      className="text-[#4A90E2]"
                    />
                  ) : (
                    <Award
                      size={22}
                      className="text-[#4A90E2]"
                    />
                  )}
                </div>

                <div>
                  <h2 className="font-semibold text-[#23405F]">
                    {item.title}
                  </h2>

                  <p className="mt-1 text-sm text-[#6B7F95]">
                    {item.student}
                  </p>

                  <p className="mt-2 text-xs text-[#8CA0B5]">
                    {item.id} • {item.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    item.status === "Verified"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-[#DCEEFF] text-[#4A90E2]"
                  }`}
                >
                  {item.status}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSelected(item);
                  }}
                  className="flex items-center gap-2 rounded-xl border border-[#D8E8F7] px-4 py-2.5 text-sm font-semibold text-[#4A90E2] hover:bg-[#DCEEFF]"
                >
                  <Eye size={17} />
                  View
                </button>

              </div>
            </div>
          </div>
        ))}

        {filteredAchievements.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#D8E8F7] bg-white p-10 text-center">
            <p className="font-semibold text-[#23405F]">
              No records found
            </p>

            <p className="mt-1 text-sm text-[#6B7F95]">
              Try another search or filter.
            </p>
          </div>
        )}

      </div>

      {/* ADD RECORD MODAL */}
      {showForm && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 p-5"
          onClick={handleCloseForm}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-start justify-between">

              <div>
                <h2 className="text-xl font-bold text-[#23405F]">
                  Add Record
                </h2>

                <p className="mt-1 text-sm text-[#6B7F95]">
                  Add an achievement or certificate.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseForm}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B7F95] hover:bg-[#DCEEFF] hover:text-[#4A90E2]"
              >
                <X size={18} />
              </button>

            </div>

            <div className="mt-6 space-y-5">

              {/* STUDENT */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                  Student Name
                </label>

                <input
                  type="text"
                  value={student}
                  onChange={(e) =>
                    setStudent(e.target.value)
                  }
                  placeholder="Enter student name"
                  className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
                />
              </div>

              {/* TITLE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                  Achievement / Certificate Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Enter title"
                  className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
                />
              </div>

              {/* TYPE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                  Record Type
                </label>

                <select
                  value={type}
                  onChange={(e) =>
                    setType(
                      e.target.value as
                        | "Achievement"
                        | "Certificate",
                    )
                  }
                  className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
                >
                  <option value="Achievement">
                    Achievement
                  </option>

                  <option value="Certificate">
                    Certificate
                  </option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleAddRecord}
                className="w-full rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white transition hover:bg-[#3B7FCB]"
              >
                Add Record
              </button>

            </div>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-5"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-start justify-between">

              <div>
                <h2 className="text-xl font-bold text-[#23405F]">
                  Record Details
                </h2>

                <p className="mt-1 text-sm text-[#6B7F95]">
                  {selected.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B7F95] hover:bg-[#DCEEFF] hover:text-[#4A90E2]"
              >
                <X size={18} />
              </button>

            </div>

            <div className="mt-6 space-y-4">

              <div className="rounded-xl bg-[#F8FBFF] p-4">
                <p className="text-xs text-[#8CA0B5]">
                  Student
                </p>

                <p className="mt-1 font-semibold text-[#23405F]">
                  {selected.student}
                </p>
              </div>

              <div className="rounded-xl bg-[#F8FBFF] p-4">
                <p className="text-xs text-[#8CA0B5]">
                  Title
                </p>

                <p className="mt-1 font-semibold text-[#23405F]">
                  {selected.title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-[#F8FBFF] p-4">
                  <p className="text-xs text-[#8CA0B5]">
                    Type
                  </p>

                  <p className="mt-1 font-semibold text-[#23405F]">
                    {selected.type}
                  </p>
                </div>

                <div className="rounded-xl bg-[#F8FBFF] p-4">
                  <p className="text-xs text-[#8CA0B5]">
                    Status
                  </p>

                  <p className="mt-1 font-semibold text-[#23405F]">
                    {selected.status}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="w-full rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white hover:bg-[#3B7FCB]"
              >
                Close
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Achievements;