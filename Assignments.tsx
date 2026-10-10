import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, Search } from "lucide-react";
import { Link } from "react-router-dom";

type Assignment = {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  status: "Pending" | "Submitted" | "Overdue";
  marks: number;
};

export const assignments: Assignment[] = [
  {
    id: "1",
    title: "Database Management System - ER Diagram",
    subject: "DBMS",
    description:
      "Design an ER diagram for a university management system and explain the relationships.",
    dueDate: "08 Oct 2026",
    status: "Pending",
    marks: 20,
  },
  {
    id: "2",
    title: "Java OOP Concepts",
    subject: "Java",
    description:
      "Explain inheritance, polymorphism, abstraction and encapsulation with examples.",
    dueDate: "10 Oct 2026",
    status: "Submitted",
    marks: 25,
  },
  {
    id: "3",
    title: "Data Structures - Arrays",
    subject: "DSA",
    description:
      "Solve the given array problems and submit the solutions with proper complexity analysis.",
    dueDate: "12 Oct 2026",
    status: "Pending",
    marks: 30,
  },
  {
    id: "4",
    title: "Computer Networks Assignment",
    subject: "CN",
    description:
      "Explain OSI model layers and compare OSI with TCP/IP architecture.",
    dueDate: "05 Oct 2026",
    status: "Overdue",
    marks: 15,
  },
  {
    id: "5",
    title: "Operating System - Process Management",
    subject: "OS",
    description:
      "Explain process states, scheduling and context switching with suitable diagrams.",
    dueDate: "15 Oct 2026",
    status: "Pending",
    marks: 20,
  },
];

function Assignments() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "All" | "Pending" | "Submitted" | "Overdue"
  >("All");

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const matchesSearch =
        assignment.title.toLowerCase().includes(search.toLowerCase()) ||
        assignment.subject.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || assignment.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const getStatusStyle = (status: Assignment["status"]) => {
    if (status === "Submitted") {
      return "bg-green-50 text-green-600 border border-green-100";
    }

    if (status === "Overdue") {
      return "bg-red-50 text-red-500 border border-red-100";
    }

    return "bg-orange-50 text-orange-500 border border-orange-100";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[#4A90E2]">
          Student Activity
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#23405F]">
          Assignments
        </h1>

        <p className="mt-2 text-sm text-[#6B7F95]">
          View and manage all your assigned academic activities.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5">
          <p className="text-sm text-[#6B7F95]">Total Assignments</p>
          <p className="mt-2 text-2xl font-bold text-[#23405F]">
            {assignments.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5">
          <p className="text-sm text-[#6B7F95]">Pending</p>
          <p className="mt-2 text-2xl font-bold text-orange-500">
            {assignments.filter((a) => a.status === "Pending").length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5">
          <p className="text-sm text-[#6B7F95]">Submitted</p>
          <p className="mt-2 text-2xl font-bold text-green-600">
            {assignments.filter((a) => a.status === "Submitted").length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5">
          <p className="text-sm text-[#6B7F95]">Overdue</p>
          <p className="mt-2 text-2xl font-bold text-red-500">
            {assignments.filter((a) => a.status === "Overdue").length}
          </p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8CA0B5]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assignments..."
              className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] py-3 pl-10 pr-4 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {["All", "Pending", "Submitted", "Overdue"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setFilter(
                    item as "All" | "Pending" | "Submitted" | "Overdue"
                  )
                }
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  filter === item
                    ? "bg-[#4A90E2] text-white"
                    : "border border-[#D8E8F7] bg-white text-[#6B7F95] hover:bg-[#F8FBFF]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Assignment Cards */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {filteredAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="rounded-2xl border border-[#D8E8F7] bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-3 inline-flex rounded-lg bg-[#DCEEFF] px-3 py-1 text-xs font-semibold text-[#4A90E2]">
                  {assignment.subject}
                </div>

                <h2 className="text-lg font-bold text-[#23405F]">
                  {assignment.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#6B7F95]">
                  {assignment.description}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                  assignment.status
                )}`}
              >
                {assignment.status}
              </span>
            </div>

            {/* Assignment Info */}
            <div className="mt-5 flex flex-wrap gap-4 border-t border-[#EEF4F9] pt-4">
              <div className="flex items-center gap-2 text-sm text-[#6B7F95]">
                <CalendarDays size={16} className="text-[#4A90E2]" />
                Due: {assignment.dueDate}
              </div>

              <div className="flex items-center gap-2 text-sm text-[#6B7F95]">
                <CheckCircle2 size={16} className="text-[#4A90E2]" />
                Marks: {assignment.marks}
              </div>
            </div>

            {/* Button */}
            <div className="mt-5">
              <Link
                to={`/student/assignments/${assignment.id}`}
                className="inline-flex items-center justify-center rounded-xl bg-[#4A90E2] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3D7FC7]"
              >
                View Assignment
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAssignments.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[#D8E8F7] bg-white py-14 text-center">
          <Clock3
            size={38}
            className="mx-auto text-[#8CA0B5]"
          />

          <h3 className="mt-4 text-lg font-semibold text-[#23405F]">
            No assignments found
          </h3>

          <p className="mt-2 text-sm text-[#6B7F95]">
            Try changing your search or filter.
          </p>
        </div>
      )}
    </div>
  );
}

export default Assignments;