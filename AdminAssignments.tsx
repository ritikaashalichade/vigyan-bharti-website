import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Eye,
  FilePlus2,
  Search,
  Users,
  X,
} from "lucide-react";

type Assignment = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  submissions: number;
  status: "Active" | "Completed";
};

const initialAssignments: Assignment[] = [
  {
    id: "ASG-3001",
    title: "Java Arrays Assignment",
    subject: "Data Structures",
    dueDate: "05 Oct 2026",
    submissions: 42,
    status: "Active",
  },
  {
    id: "ASG-3002",
    title: "SQL Query Practice",
    subject: "Database Management",
    dueDate: "08 Oct 2026",
    submissions: 35,
    status: "Active",
  },
  {
    id: "ASG-3003",
    title: "OS Process Scheduling",
    subject: "Operating Systems",
    dueDate: "28 Sep 2026",
    submissions: 48,
    status: "Completed",
  },
];

function Assignments() {
  const [assignments, setAssignments] =
    useState<Assignment[]>(initialAssignments);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "All" | "Active" | "Completed"
  >("All");

  const [selected, setSelected] =
    useState<Assignment | null>(null);

  const [showCreateForm, setShowCreateForm] =
    useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        assignment.title.toLowerCase().includes(searchText) ||
        assignment.subject.toLowerCase().includes(searchText);

      const matchesFilter =
        filter === "All" ||
        assignment.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [assignments, search, filter]);

  const handleOpenCreate = () => {
    setSelected(null);
    setShowCreateForm(true);
  };

  const handleCloseCreate = () => {
    setShowCreateForm(false);
    setNewTitle("");
    setNewSubject("");
    setNewDueDate("");
  };

  const handleCreateAssignment = () => {
    if (!newTitle.trim()) {
      alert("Please enter assignment title.");
      return;
    }

    if (!newSubject) {
      alert("Please select a subject.");
      return;
    }

    if (!newDueDate) {
      alert("Please select due date.");
      return;
    }

    const newAssignment: Assignment = {
      id: `ASG-${3001 + assignments.length}`,
      title: newTitle.trim(),
      subject: newSubject,
      dueDate: newDueDate,
      submissions: 0,
      status: "Active",
    };

    setAssignments((current) => [
      newAssignment,
      ...current,
    ]);

    handleCloseCreate();
  };

  return (
    <div className="space-y-7">

      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#23405F]">
            Assignment Management
          </h1>

          <p className="mt-1 text-[#6B7F95]">
            Create, manage and track internship assignments.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="relative z-10 flex items-center justify-center gap-2 rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white transition hover:bg-[#3B7FCB]"
        >
          <FilePlus2 size={18} />
          Create Assignment
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">

        <div className="flex w-full items-center gap-2 rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 md:max-w-md">
          <Search size={18} className="text-[#6B7F95]" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assignments..."
            className="w-full bg-transparent text-sm text-[#23405F] outline-none placeholder:text-[#8CA0B5]"
          />
        </div>

        <div className="flex gap-2">
          {(["All", "Active", "Completed"] as const).map(
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

      {/* ASSIGNMENT LIST */}
      <div className="overflow-hidden rounded-2xl border border-[#D8E8F7] bg-white shadow-sm">

        <div className="border-b border-[#D8E8F7] px-6 py-5">
          <h2 className="text-lg font-bold text-[#23405F]">
            Assignments
          </h2>

          <p className="mt-1 text-sm text-[#6B7F95]">
            {filteredAssignments.length} assignment
            {filteredAssignments.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {filteredAssignments.length === 0 ? (
          <div className="p-10 text-center">
            <FilePlus2
              size={32}
              className="mx-auto text-[#8CA0B5]"
            />

            <h3 className="mt-3 font-semibold text-[#23405F]">
              No assignments found
            </h3>

            <p className="mt-1 text-sm text-[#6B7F95]">
              Try another search or filter.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#D8E8F7]">

            {filteredAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex flex-col gap-4 px-6 py-5 transition hover:bg-[#F8FBFF] md:flex-row md:items-center md:justify-between"
              >

                <div>
                  <h3 className="font-semibold text-[#23405F]">
                    {assignment.title}
                  </h3>

                  <p className="mt-1 text-sm text-[#6B7F95]">
                    {assignment.subject}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-[#8CA0B5]">

                    <span className="flex items-center gap-1">
                      <CalendarDays size={14} />
                      Due {assignment.dueDate}
                    </span>

                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {assignment.submissions} submissions
                    </span>

                    <span>
                      {assignment.id}
                    </span>

                  </div>
                </div>

                <div className="flex items-center gap-3">

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      assignment.status === "Active"
                        ? "bg-[#DCEEFF] text-[#4A90E2]"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {assignment.status}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setSelected(assignment);
                    }}
                    className="flex items-center gap-2 rounded-xl border border-[#D8E8F7] px-4 py-2.5 text-sm font-semibold text-[#4A90E2] hover:bg-[#DCEEFF]"
                  >
                    <Eye size={17} />
                    View
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* VIEW MODAL */}
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
                  Assignment Details
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
                  Title
                </p>

                <p className="mt-1 font-semibold text-[#23405F]">
                  {selected.title}
                </p>
              </div>

              <div className="rounded-xl bg-[#F8FBFF] p-4">
                <p className="text-xs text-[#8CA0B5]">
                  Subject
                </p>

                <p className="mt-1 font-semibold text-[#23405F]">
                  {selected.subject}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-[#F8FBFF] p-4">
                  <p className="text-xs text-[#8CA0B5]">
                    Due Date
                  </p>

                  <p className="mt-1 font-semibold text-[#23405F]">
                    {selected.dueDate}
                  </p>
                </div>

                <div className="rounded-xl bg-[#F8FBFF] p-4">
                  <p className="text-xs text-[#8CA0B5]">
                    Submissions
                  </p>

                  <p className="mt-1 font-semibold text-[#23405F]">
                    {selected.submissions}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-600">
                <CheckCircle2 size={18} />
                Assignment record available
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

      {/* CREATE ASSIGNMENT MODAL */}
      {showCreateForm && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 p-5"
          onClick={handleCloseCreate}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-start justify-between">

              <div>
                <h2 className="text-xl font-bold text-[#23405F]">
                  Create Assignment
                </h2>

                <p className="mt-1 text-sm text-[#6B7F95]">
                  Add a new internship assignment.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseCreate}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B7F95] hover:bg-[#DCEEFF] hover:text-[#4A90E2]"
              >
                <X size={18} />
              </button>

            </div>

            <div className="mt-6 space-y-5">

              {/* TITLE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                  Assignment Title
                </label>

                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) =>
                    setNewTitle(e.target.value)
                  }
                  placeholder="Enter assignment title"
                  className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
                />
              </div>

              {/* SUBJECT */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                  Subject
                </label>

                <select
                  value={newSubject}
                  onChange={(e) =>
                    setNewSubject(e.target.value)
                  }
                  className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
                >
                  <option value="">
                    Select Subject
                  </option>

                  <option value="Data Structures">
                    Data Structures
                  </option>

                  <option value="Database Management">
                    Database Management
                  </option>

                  <option value="Operating Systems">
                    Operating Systems
                  </option>

                  <option value="Java Programming">
                    Java Programming
                  </option>

                  <option value="Computer Networks">
                    Computer Networks
                  </option>
                </select>
              </div>

              {/* DATE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                  Due Date
                </label>

                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) =>
                    setNewDueDate(e.target.value)
                  }
                  className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
                />
              </div>

              {/* CREATE */}
              <button
                type="button"
                onClick={handleCreateAssignment}
                className="w-full rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white transition hover:bg-[#3B7FCB]"
              >
                Create Assignment
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Assignments;