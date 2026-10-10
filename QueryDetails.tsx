import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MessageCircleQuestion,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

type Query = {
  id: string;
  title: string;
  subject: string;
  description: string;
  status: "Pending" | "Answered";
  date: string;
};

const defaultQueries: Query[] = [
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

const mentorResponses: Record<string, string> = {
  "QRY-1024":
    "The two pointer approach is useful when processing elements from both ends of an array. Usually, one pointer starts from the left and another from the right, and they move toward each other based on the problem requirement.",

  "QRY-1026":
    "Checked exceptions are generally verified at compile time, while unchecked exceptions occur during runtime.",
};

function QueryDetails() {
  const { id } = useParams();

  const [query, setQuery] = useState<Query | null>(null);

  useEffect(() => {
    const savedQueries = localStorage.getItem("vvm_queries");

    const queries: Query[] = savedQueries
      ? JSON.parse(savedQueries)
      : defaultQueries;

    const foundQuery = queries.find(
      (item) => item.id === id,
    );

    setQuery(foundQuery ?? null);
  }, [id]);

  if (!query) {
    return (
      <div className="space-y-5">
        <Link
          to="/student/doubts"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A90E2] hover:underline"
        >
          <ArrowLeft size={17} />
          Back to My Doubts
        </Link>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-[#23405F]">
            Query not found
          </h1>

          <p className="mt-2 text-sm text-[#6B7F95]">
            The requested query does not exist.
          </p>
        </div>
      </div>
    );
  }

  const isAnswered = query.status === "Answered";

  const mentorResponse = isAnswered
    ? mentorResponses[query.id] ??
      "Your mentor has responded to this query."
    : "";

  return (
    <div className="space-y-7">
      {/* Back */}
      <Link
        to="/student/doubts"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A90E2] hover:underline"
      >
        <ArrowLeft size={17} />
        Back to My Doubts
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#23405F]">
          Query Details
        </h1>

        <p className="mt-1 text-[#6B7F95]">
          View your question and mentor response.
        </p>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#DCEEFF] p-3">
              <MessageCircleQuestion
                size={24}
                className="text-[#4A90E2]"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#23405F]">
                {query.title}
              </h2>

              <p className="mt-1 text-sm text-[#6B7F95]">
                {query.subject}
              </p>

              <p className="mt-1 text-xs text-[#8CA0B5]">
                Query ID: {query.id}
              </p>
            </div>
          </div>

          <span
            className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${
              isAnswered
                ? "bg-emerald-50 text-emerald-600"
                : "bg-[#DCEEFF] text-[#4A90E2]"
            }`}
          >
            {isAnswered ? (
              <CheckCircle2 size={15} />
            ) : (
              <Clock3 size={15} />
            )}

            {query.status}
          </span>
        </div>

        <div className="my-6 border-t border-[#D8E8F7]" />

        {/* Question */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#8CA0B5]">
            Your Question
          </p>

          <div className="mt-3 rounded-xl bg-[#F8FBFF] p-5">
            <p className="leading-7 text-[#46627F]">
              {query.description}
            </p>
          </div>
        </div>

        {/* Response */}
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#8CA0B5]">
            Mentor Response
          </p>

          {isAnswered ? (
            <div className="mt-3 rounded-xl bg-[#DCEEFF] p-5">
              <p className="leading-7 text-[#46627F]">
                {mentorResponse}
              </p>
            </div>
          ) : (
            <div className="mt-3 rounded-xl border border-dashed border-[#D8E8F7] bg-[#F8FBFF] p-6 text-center">
              <Clock3
                size={28}
                className="mx-auto text-[#4A90E2]"
              />

              <h3 className="mt-3 font-semibold text-[#23405F]">
                Waiting for mentor response
              </h3>

              <p className="mt-1 text-sm text-[#6B7F95]">
                Your query has been submitted. Your mentor will
                respond here once it is reviewed.
              </p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-[#F8FBFF] p-4">
            <p className="text-xs text-[#8CA0B5]">
              Submitted On
            </p>

            <p className="mt-1 font-semibold text-[#23405F]">
              {query.date}
            </p>
          </div>

          <div className="rounded-xl bg-[#F8FBFF] p-4">
            <p className="text-xs text-[#8CA0B5]">
              Current Status
            </p>

            <p className="mt-1 font-semibold text-[#23405F]">
              {query.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueryDetails;