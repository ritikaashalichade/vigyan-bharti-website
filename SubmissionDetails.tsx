import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileText,
  User,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const submissionData: Record<
  string,
  {
    title: string;
    subject: string;
    submittedOn: string;
    status: string;
    marks: string;
    file: string;
    mentor: string;
    feedback: string;
  }
> = {
  "SUB-2048": {
    title: "Java Arrays Assignment",
    subject: "Data Structures",
    submittedOn: "30 Sep 2026",
    status: "Evaluated",
    marks: "8 / 10",
    file: "JavaArraysSolution.java",
    mentor: "Dr. Rahul Sharma",
    feedback:
      "Good approach and clean implementation. The solution is correct and easy to understand. Try to improve the time complexity explanation in your submission.",
  },

  "SUB-2049": {
    title: "DBMS SQL Queries",
    subject: "Database Management",
    submittedOn: "28 Sep 2026",
    status: "Under Review",
    marks: "Pending",
    file: "DBMS_SQL_Queries.sql",
    mentor: "Dr. Rahul Sharma",
    feedback:
      "Your submission has been received and is currently under review. Evaluation feedback will be available soon.",
  },

  "SUB-2050": {
    title: "Operating Systems Quiz",
    subject: "Operating Systems",
    submittedOn: "25 Sep 2026",
    status: "Evaluated",
    marks: "9 / 10",
    file: "OperatingSystemsQuiz.pdf",
    mentor: "Dr. Rahul Sharma",
    feedback:
      "Excellent performance. Most answers were accurate and clearly explained. Keep up the good work.",
  },
};

function SubmissionDetails() {
  const { id } = useParams();

  const submission = id ? submissionData[id] : undefined;

  if (!submission) {
    return (
      <div className="space-y-5">
        <Link
          to="/student/submissions"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A90E2] hover:underline"
        >
          <ArrowLeft size={17} />
          Back to My Submissions
        </Link>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-[#23405F]">
            Submission not found
          </h1>

          <p className="mt-2 text-sm text-[#6B7F95]">
            The requested submission does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <Link
        to="/student/submissions"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A90E2] hover:underline"
      >
        <ArrowLeft size={17} />
        Back to My Submissions
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-[#23405F]">
          Submission Details
        </h1>

        <p className="mt-1 text-[#6B7F95]">
          View your submission and evaluation details.
        </p>
      </div>

      <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#DCEEFF] p-3">
              <FileText
                size={24}
                className="text-[#4A90E2]"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#23405F]">
                {submission.title}
              </h2>

              <p className="mt-1 text-sm text-[#6B7F95]">
                {submission.subject}
              </p>
            </div>
          </div>

          <span
            className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${
              submission.status === "Evaluated"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-[#DCEEFF] text-[#4A90E2]"
            }`}
          >
            {submission.status === "Evaluated" ? (
              <CheckCircle2 size={15} />
            ) : (
              <Clock3 size={15} />
            )}

            {submission.status}
          </span>
        </div>

        <div className="my-6 border-t border-[#D8E8F7]" />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <p className="text-xs text-[#8CA0B5]">
              Submission ID
            </p>

            <p className="mt-1 font-semibold text-[#23405F]">
              {id}
            </p>
          </div>

          <div>
            <p className="text-xs text-[#8CA0B5]">
              Submitted On
            </p>

            <p className="mt-1 font-semibold text-[#23405F]">
              {submission.submittedOn}
            </p>
          </div>

          <div>
            <p className="text-xs text-[#8CA0B5]">
              Marks
            </p>

            <p className="mt-1 font-semibold text-[#4A90E2]">
              {submission.marks}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#23405F]">
            Submitted File
          </h2>

          <div className="mt-5 flex items-center gap-4 rounded-xl bg-[#F8FBFF] p-4">
            <div className="rounded-xl bg-[#DCEEFF] p-3">
              <FileText
                size={22}
                className="text-[#4A90E2]"
              />
            </div>

            <div>
              <p className="font-semibold text-[#23405F]">
                {submission.file}
              </p>

              <p className="mt-1 text-xs text-[#8CA0B5]">
                Submitted file
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#23405F]">
            Evaluated By
          </h2>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DCEEFF] font-semibold text-[#4A90E2]">
              DR
            </div>

            <div>
              <div className="flex items-center gap-2">
                <User
                  size={16}
                  className="text-[#4A90E2]"
                />

                <p className="font-semibold text-[#23405F]">
                  {submission.mentor}
                </p>
              </div>

              <p className="mt-1 text-sm text-[#6B7F95]">
                Academic Mentor
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Clock3
            size={20}
            className="text-[#4A90E2]"
          />

          <h2 className="text-lg font-bold text-[#23405F]">
            Mentor Feedback
          </h2>
        </div>

        <div className="mt-4 rounded-xl bg-[#F8FBFF] p-5">
          <p className="leading-7 text-[#46627F]">
            {submission.feedback}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SubmissionDetails;