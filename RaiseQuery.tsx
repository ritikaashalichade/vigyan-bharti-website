import { useState } from "react";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type Query = {
  id: string;
  title: string;
  subject: string;
  description: string;
  status: "Pending" | "Answered";
  date: string;
};

function RaiseQuery() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !subject || !description.trim()) {
      alert("Please fill all the fields.");
      return;
    }

    const existingQueries: Query[] = JSON.parse(
      localStorage.getItem("vvm_queries") || "[]",
    );

    const newQuery: Query = {
      id: `QRY-${1000 + existingQueries.length + 1}`,
      title: title.trim(),
      subject,
      description: description.trim(),
      status: "Pending",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    localStorage.setItem(
      "vvm_queries",
      JSON.stringify([...existingQueries, newQuery]),
    );

    setSubmitted(true);

    setTimeout(() => {
      navigate("/student/doubts");
    }, 1200);
  };

  return (
    <div className="space-y-7">
      <Link
        to="/student/doubts"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A90E2] hover:underline"
      >
        <ArrowLeft size={17} />
        Back to My Doubts
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-[#23405F]">
          Raise a Query
        </h1>

        <p className="mt-1 text-[#6B7F95]">
          Send your question to your mentor.
        </p>
      </div>

      <div className="max-w-3xl rounded-2xl border border-[#D8E8F7] bg-white p-7 shadow-sm">
        {submitted && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-600">
            <CheckCircle2 size={20} />
            Query submitted successfully!
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#23405F]">
              Query Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your query title"
              className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#23405F]">
              Subject
            </label>

            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
            >
              <option value="">Select Subject</option>
              <option value="Data Structures">
                Data Structures
              </option>
              <option value="DBMS">DBMS</option>
              <option value="Operating Systems">
                Operating Systems
              </option>
              <option value="Java Programming">
                Java Programming
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#23405F]">
              Describe your doubt
            </label>

            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your question here..."
              className="w-full resize-none rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitted}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#4A90E2] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3B7FCB] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Send size={17} />
            {submitted ? "Submitting..." : "Submit Query"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RaiseQuery;