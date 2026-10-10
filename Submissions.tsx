import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

type SubmissionStatus = "Evaluated" | "Under Review";

type Submission = {
  id: string;
  title: string;
  subject: string;
  submittedOn: string;
  status: SubmissionStatus;
  marks: string;
};

const submissions: Submission[] = [
  {
    id: "SUB-2048",
    title: "Java Arrays Assignment",
    subject: "Data Structures",
    submittedOn: "30 Sep 2026",
    status: "Evaluated",
    marks: "8/10",
  },
  {
    id: "SUB-2049",
    title: "DBMS SQL Queries",
    subject: "Database Management",
    submittedOn: "28 Sep 2026",
    status: "Under Review",
    marks: "Pending",
  },
  {
    id: "SUB-2050",
    title: "Operating Systems Quiz",
    subject: "Operating Systems",
    submittedOn: "25 Sep 2026",
    status: "Evaluated",
    marks: "9/10",
  },
];

function Submissions() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | SubmissionStatus>(
    "All",
  );

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((submission) => {
      const matchesSearch =
        submission.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        submission.subject
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || submission.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const evaluatedCount = submissions.filter(
    (submission) => submission.status === "Evaluated",
  ).length;

  const reviewCount = submissions.filter(
    (submission) => submission.status === "Under Review",
  ).length;

  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#23405F]">
          My Submissions
        </h1>

        <p className="mt-1 text-[#6B7F95]">
          Track your submitted assignments and evaluation status.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <FileText
              size={21}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Total Submissions
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {submissions.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <CheckCircle2
              size={21}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Evaluated
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {evaluatedCount}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <Clock3
              size={21}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Under Review
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {reviewCount}
          </p>
        </div>
      </div>

      {/* Search + Filter */}
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
            placeholder="Search submissions..."
            className="w-full bg-transparent text-sm text-[#23405F] outline-none placeholder:text-[#8CA0B5]"
          />
        </div>

        <div className="flex gap-2">
          {(["All", "Evaluated", "Under Review"] as const).map(
            (option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
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

      {/* List */}
      <div className="overflow-hidden rounded-2xl border border-[#D8E8F7] bg-white shadow-sm">
        <div className="border-b border-[#D8E8F7] px-6 py-5">
          <h2 className="text-lg font-bold text-[#23405F]">
            Recent Submissions
          </h2>

          <p className="mt-1 text-sm text-[#6B7F95]">
            {filteredSubmissions.length} submission
            {filteredSubmissions.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="p-10 text-center">
            <FileText
              size={32}
              className="mx-auto text-[#8CA0B5]"
            />

            <h3 className="mt-3 font-semibold text-[#23405F]">
              No submissions found
            </h3>

            <p className="mt-1 text-sm text-[#6B7F95]">
              Try another search or filter.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#D8E8F7]">
            {filteredSubmissions.map((submission) => {
              const isEvaluated =
                submission.status === "Evaluated";

              return (
                <div
                  key={submission.id}
                  className="flex flex-col gap-5 px-6 py-5 transition hover:bg-[#F8FBFF] md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-[#DCEEFF] p-3">
                      <FileText
                        size={21}
                        className="text-[#4A90E2]"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#23405F]">
                        {submission.title}
                      </h3>

                      <p className="mt-1 text-sm text-[#6B7F95]">
                        {submission.subject}
                      </p>

                      <p className="mt-1 text-xs text-[#8CA0B5]">
                        Submitted on {submission.submittedOn}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-[#8CA0B5]">
                        Marks
                      </p>

                      <p className="font-semibold text-[#23405F]">
                        {submission.marks}
                      </p>
                    </div>

                    <span
                      className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        isEvaluated
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-[#DCEEFF] text-[#4A90E2]"
                      }`}
                    >
                      {isEvaluated ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        <Clock3 size={14} />
                      )}

                      {submission.status}
                    </span>

                    <Link
                      to={`/student/submission-details/${submission.id}`}
                      className="flex items-center gap-2 rounded-xl border border-[#D8E8F7] px-4 py-2.5 text-sm font-semibold text-[#4A90E2] hover:bg-[#DCEEFF]"
                    >
                      <Eye size={17} />
                      View
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Submissions;