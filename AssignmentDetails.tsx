import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";

function AssignmentDetails() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      alert("Please choose a file first.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="space-y-7">
      <Link
        to="/student/assignments"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A90E2] hover:underline"
      >
        <ArrowLeft size={17} />
        Back to Assignments
      </Link>

      <div className="rounded-2xl border border-[#D8E8F7] bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#DCEEFF] p-4">
              <FileText size={25} className="text-[#4A90E2]" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#23405F]">
                Java Arrays Assignment
              </h1>

              <p className="mt-2 text-sm text-[#6B7F95]">
                Data Structures • Assignment
              </p>
            </div>
          </div>

          <span
            className={`w-fit rounded-full px-4 py-2 text-xs font-semibold ${
              submitted
                ? "bg-emerald-50 text-emerald-600"
                : "bg-[#DCEEFF] text-[#4A90E2]"
            }`}
          >
            {submitted ? "Submitted" : "Pending"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#23405F]">
              Assignment Description
            </h2>

            <p className="mt-4 leading-7 text-[#46627F]">
              Solve the given Java array problems using efficient approaches.
              Write clean code and submit your solution before the deadline.
            </p>

            <h3 className="mt-6 font-semibold text-[#23405F]">
              Tasks
            </h3>

            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3 rounded-xl bg-[#F8FBFF] p-4">
                <CheckCircle2 size={18} className="text-[#4A90E2]" />
                <span className="text-sm text-[#46627F]">
                  Find the largest element in an array
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-[#F8FBFF] p-4">
                <CheckCircle2 size={18} className="text-[#4A90E2]" />
                <span className="text-sm text-[#46627F]">
                  Reverse an array using two pointers
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-[#F8FBFF] p-4">
                <CheckCircle2 size={18} className="text-[#4A90E2]" />
                <span className="text-sm text-[#46627F]">
                  Find duplicate elements
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#23405F]">
              Submit Assignment
            </h2>

            <label className="mt-5 block cursor-pointer rounded-xl border-2 border-dashed border-[#D8E8F7] bg-[#F8FBFF] p-8 text-center transition hover:bg-[#DCEEFF]">
              <Upload
                size={30}
                className="mx-auto text-[#4A90E2]"
              />

              <p className="mt-3 font-semibold text-[#23405F]">
                {selectedFile
                  ? selectedFile.name
                  : "Upload your solution"}
              </p>

              <p className="mt-1 text-sm text-[#6B7F95]">
                PDF, ZIP or source code files
              </p>

              <input
                type="file"
                className="hidden"
                accept=".pdf,.zip,.java,.txt"
                onChange={handleFileChange}
              />

              <span className="mt-5 inline-block rounded-xl bg-[#4A90E2] px-6 py-3 text-sm font-semibold text-white">
                Choose File
              </span>
            </label>

            {selectedFile && (
              <p className="mt-3 text-sm text-[#46627F]">
                Selected:{" "}
                <span className="font-semibold">
                  {selectedFile.name}
                </span>
              </p>
            )}

            {submitted && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-600">
                <CheckCircle2 size={18} />
                Assignment submitted successfully.
              </div>
            )}
          </div>
        </div>

        <div className="h-fit rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#23405F]">
            Assignment Info
          </h2>

          <div className="mt-5 space-y-5">
            <div className="flex items-center gap-3">
              <CalendarDays size={20} className="text-[#4A90E2]" />
              <div>
                <p className="text-xs text-[#8CA0B5]">Due Date</p>
                <p className="text-sm font-semibold text-[#23405F]">
                  2 October 2026
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock3 size={20} className="text-[#4A90E2]" />
              <div>
                <p className="text-xs text-[#8CA0B5]">
                  Time Remaining
                </p>
                <p className="text-sm font-semibold text-[#23405F]">
                  2 days
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FileText size={20} className="text-[#4A90E2]" />
              <div>
                <p className="text-xs text-[#8CA0B5]">Type</p>
                <p className="text-sm font-semibold text-[#23405F]">
                  Coding Assignment
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitted}
            className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white ${
              submitted
                ? "cursor-not-allowed bg-emerald-500"
                : "bg-[#4A90E2] hover:bg-[#3B7FCB]"
            }`}
          >
            {submitted ? (
              <>
                <CheckCircle2 size={18} />
                Submitted
              </>
            ) : (
              "Submit Assignment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignmentDetails;