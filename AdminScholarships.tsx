import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Eye,
  FilePlus2,
  Search,
  X,
} from "lucide-react";

type Scholarship = {
  id: string;
  title: string;
  amount: string;
  eligibility: string;
  deadline: string;
  applicants: number;
  status: "Open" | "Closed";
};

const initialScholarships: Scholarship[] = [
  {
    id: "SCH-6001",
    title: "Merit Scholarship",
    amount: "₹25,000",
    eligibility: "Students with CGPA above 8.5",
    deadline: "15 Oct 2026",
    applicants: 42,
    status: "Open",
  },
  {
    id: "SCH-6002",
    title: "Need Based Scholarship",
    amount: "₹20,000",
    eligibility: "Eligible students with financial need",
    deadline: "20 Oct 2026",
    applicants: 31,
    status: "Open",
  },
  {
    id: "SCH-6003",
    title: "Women in Technology Scholarship",
    amount: "₹30,000",
    eligibility: "Women students pursuing technology programs",
    deadline: "25 Sep 2026",
    applicants: 56,
    status: "Closed",
  },
];

function Scholarships() {
  const [scholarships, setScholarships] =
    useState<Scholarship[]>(initialScholarships);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "All" | "Open" | "Closed"
  >("All");

  const [selected, setSelected] =
    useState<Scholarship | null>(null);

  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [deadline, setDeadline] = useState("");

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(searchText) ||
        item.eligibility.toLowerCase().includes(searchText);

      const matchesFilter =
        filter === "All" || item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [scholarships, search, filter]);

  const handleCreate = () => {
    if (!title.trim()) {
      alert("Please enter scholarship title.");
      return;
    }

    if (!amount.trim()) {
      alert("Please enter scholarship amount.");
      return;
    }

    if (!eligibility.trim()) {
      alert("Please enter eligibility.");
      return;
    }

    if (!deadline) {
      alert("Please select deadline.");
      return;
    }

    const newScholarship: Scholarship = {
      id: `SCH-${6001 + scholarships.length}`,
      title: title.trim(),
      amount: amount.trim(),
      eligibility: eligibility.trim(),
      deadline,
      applicants: 0,
      status: "Open",
    };

    setScholarships((current) => [
      newScholarship,
      ...current,
    ]);

    setTitle("");
    setAmount("");
    setEligibility("");
    setDeadline("");
    setShowForm(false);
  };

  return (
    <div className="space-y-7">

      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#23405F]">
            Scholarship Management
          </h1>

          <p className="mt-1 text-[#6B7F95]">
            Manage scholarship opportunities and applications.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white hover:bg-[#3B7FCB]"
        >
          <FilePlus2 size={18} />
          Add Scholarship
        </button>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <p className="text-sm text-[#6B7F95]">
            Total Scholarships
          </p>

          <p className="mt-2 text-3xl font-bold text-[#23405F]">
            {scholarships.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <p className="text-sm text-[#6B7F95]">
            Open
          </p>

          <p className="mt-2 text-3xl font-bold text-[#4A90E2]">
            {
              scholarships.filter(
                (item) => item.status === "Open",
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <p className="text-sm text-[#6B7F95]">
            Total Applicants
          </p>

          <p className="mt-2 text-3xl font-bold text-[#23405F]">
            {scholarships.reduce(
              (sum, item) => sum + item.applicants,
              0,
            )}
          </p>
        </div>

      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[#D8E8F7] bg-white p-5 md:flex-row md:items-center md:justify-between">

        <div className="flex w-full items-center gap-2 rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 md:max-w-md">
          <Search
            size={18}
            className="text-[#6B7F95]"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search scholarships..."
            className="w-full bg-transparent text-sm text-[#23405F] outline-none"
          />
        </div>

        <div className="flex gap-2">
          {(["All", "Open", "Closed"] as const).map(
            (option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
                  filter === option
                    ? "bg-[#4A90E2] text-white"
                    : "border border-[#D8E8F7] text-[#4A90E2]"
                }`}
              >
                {option}
              </button>
            ),
          )}
        </div>

      </div>

      {/* LIST */}
      <div className="space-y-4">

        {filteredScholarships.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>
                <h2 className="font-semibold text-[#23405F]">
                  {item.title}
                </h2>

                <p className="mt-1 text-sm text-[#4A90E2]">
                  {item.amount}
                </p>

                <p className="mt-2 text-sm text-[#6B7F95]">
                  {item.eligibility}
                </p>

                <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#8CA0B5]">
                  <span>{item.id}</span>
                  <span>Deadline: {item.deadline}</span>
                  <span>{item.applicants} applicants</span>
                </div>
              </div>

              <div className="flex items-center gap-3">

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    item.status === "Open"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {item.status}
                </span>

                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className="flex items-center gap-2 rounded-xl border border-[#D8E8F7] px-4 py-2.5 text-sm font-semibold text-[#4A90E2]"
                >
                  <Eye size={17} />
                  View
                </button>

              </div>
            </div>
          </div>
        ))}

      </div>

      {/* ADD MODAL */}
      {showForm && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 p-5"
          onClick={() => setShowForm(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-start justify-between">

              <div>
                <h2 className="text-xl font-bold text-[#23405F]">
                  Add Scholarship
                </h2>

                <p className="mt-1 text-sm text-[#6B7F95]">
                  Create a new scholarship opportunity.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B7F95] hover:bg-[#DCEEFF]"
              >
                <X size={18} />
              </button>

            </div>

            <div className="mt-6 space-y-4">

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Scholarship title"
                className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm outline-none"
              />

              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount e.g. ₹25,000"
                className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm outline-none"
              />

              <input
                value={eligibility}
                onChange={(e) =>
                  setEligibility(e.target.value)
                }
                placeholder="Eligibility"
                className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm outline-none"
              />

              <input
                type="date"
                value={deadline}
                onChange={(e) =>
                  setDeadline(e.target.value)
                }
                className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm outline-none"
              />

              <button
                type="button"
                onClick={handleCreate}
                className="w-full rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white"
              >
                Add Scholarship
              </button>

            </div>
          </div>
        </div>
      )}

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

            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#23405F]">
                  Scholarship Details
                </h2>

                <p className="mt-1 text-sm text-[#6B7F95]">
                  {selected.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-4">

              <div className="rounded-xl bg-[#F8FBFF] p-4">
                <p className="text-xs text-[#8CA0B5]">
                  Scholarship
                </p>
                <p className="mt-1 font-semibold text-[#23405F]">
                  {selected.title}
                </p>
              </div>

              <div className="rounded-xl bg-[#F8FBFF] p-4">
                <p className="text-xs text-[#8CA0B5]">
                  Amount
                </p>
                <p className="mt-1 font-semibold text-[#23405F]">
                  {selected.amount}
                </p>
              </div>

              <div className="rounded-xl bg-[#F8FBFF] p-4">
                <p className="text-xs text-[#8CA0B5]">
                  Eligibility
                </p>
                <p className="mt-1 text-sm text-[#46627F]">
                  {selected.eligibility}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-600">
                <CheckCircle2 size={18} />
                {selected.applicants} applications received
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="w-full rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white"
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

export default Scholarships;