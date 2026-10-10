import { useEffect, useState } from "react";
import {
  Clock3,
  MessageCircleQuestion,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

type Query = {
  id: string;
  title: string;
  subject: string;
  description: string;
  status: "Pending" | "Answered";
  date: string;
};

export const defaultQueries: Query[] = [
  {
    id: "QRY-1024",
    title: "Doubt regarding Arrays",
    subject: "Data Structures",
    description:
      "I am confused about the two pointer approach.",
    status: "Answered",
    date: "28 Sep 2026",
  },
  {
    id: "QRY-1025",
    title: "SQL JOIN confusion",
    subject: "Database Management",
    description:
      "I am confused about the difference between INNER JOIN and LEFT JOIN.",
    status: "Pending",
    date: "30 Sep 2026",
  },
  {
    id: "QRY-1026",
    title: "Java Exception Handling",
    subject: "Java Programming",
    description:
      "I need help understanding checked and unchecked exceptions.",
    status: "Answered",
    date: "29 Sep 2026",
  },
];

function Doubts() {
  const [queries, setQueries] = useState<Query[]>([]);

  useEffect(() => {
    const savedQueries = localStorage.getItem("vvm_queries");

    if (savedQueries) {
      setQueries(JSON.parse(savedQueries));
    } else {
      localStorage.setItem(
        "vvm_queries",
        JSON.stringify(defaultQueries),
      );

      setQueries(defaultQueries);
    }
  }, []);

  const pendingCount = queries.filter(
    (query) => query.status === "Pending",
  ).length;

  const answeredCount = queries.filter(
    (query) => query.status === "Answered",
  ).length;

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#23405F]">
            My Doubts
          </h1>

          <p className="mt-1 text-[#6B7F95]">
            Ask questions and track your queries with your mentor.
          </p>
        </div>

        <Link
          to="/student/raise-query"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white hover:bg-[#3B7FCB]"
        >
          <Plus size={18} />
          Raise a Query
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <p className="text-sm text-[#6B7F95]">
            Total Queries
          </p>

          <p className="mt-2 text-3xl font-bold text-[#23405F]">
            {queries.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <p className="text-sm text-[#6B7F95]">
            Pending
          </p>

          <p className="mt-2 text-3xl font-bold text-[#4A90E2]">
            {pendingCount}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <p className="text-sm text-[#6B7F95]">
            Answered
          </p>

          <p className="mt-2 text-3xl font-bold text-[#23405F]">
            {answeredCount}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {queries.map((query) => (
          <Link
            key={query.id}
            to={`/student/query-details/${query.id}`}
            className="block rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm transition hover:bg-[#F8FBFF] hover:shadow-md"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-[#DCEEFF] p-3">
                  <MessageCircleQuestion
                    size={22}
                    className="text-[#4A90E2]"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-[#23405F]">
                    {query.title}
                  </h3>

                  <p className="mt-1 text-sm text-[#6B7F95]">
                    {query.subject}
                  </p>

                  <p className="mt-2 text-sm text-[#46627F]">
                    {query.description}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs text-[#8CA0B5]">
                    <Clock3 size={14} />
                    {query.date}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    query.status === "Answered"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-[#DCEEFF] text-[#4A90E2]"
                  }`}
                >
                  {query.status}
                </span>

                <span className="text-sm font-semibold text-[#4A90E2]">
                  View Details →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Doubts;