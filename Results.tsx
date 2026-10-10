import { useState } from "react";
import {
  Award,
  BarChart3,
  CheckCircle2,
  GraduationCap,
  X,
} from "lucide-react";

type Subject = {
  name: string;
  marks: number;
  grade: string;
  feedback: string;
};

const subjects: Subject[] = [
  {
    name: "Data Structures",
    marks: 86,
    grade: "A",
    feedback:
      "Good understanding of arrays, searching and basic problem-solving techniques.",
  },
  {
    name: "Database Management",
    marks: 91,
    grade: "A+",
    feedback:
      "Excellent performance in SQL, database concepts and query writing.",
  },
  {
    name: "Operating Systems",
    marks: 82,
    grade: "A",
    feedback:
      "Strong understanding of processes, memory management and operating system concepts.",
  },
  {
    name: "Computer Networks",
    marks: 78,
    grade: "B+",
    feedback:
      "Good performance with scope for improvement in networking protocols and concepts.",
  },
  {
    name: "Java Programming",
    marks: 88,
    grade: "A",
    feedback:
      "Good coding skills and understanding of Java programming concepts.",
  },
];

function Results() {
  const [selectedSubject, setSelectedSubject] =
    useState<Subject | null>(null);

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-3xl font-bold text-[#23405F]">
          My Results
        </h1>

        <p className="mt-1 text-[#6B7F95]">
          View your academic performance and semester results.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <GraduationCap
              size={22}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Current CGPA
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            8.6
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <BarChart3
              size={22}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Semester
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            5th
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <Award
              size={22}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Total Credits
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            24
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <CheckCircle2
              size={22}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Subjects Passed
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            5/5
          </p>
        </div>
      </div>

      {/* Subject Results */}
      <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#23405F]">
              Semester 5 Result
            </h2>

            <p className="mt-1 text-sm text-[#6B7F95]">
              Click a subject to view performance details.
            </p>
          </div>

          <span className="rounded-full bg-[#DCEEFF] px-4 py-2 text-xs font-semibold text-[#4A90E2]">
            Published
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {subjects.map((subject) => (
            <button
              key={subject.name}
              type="button"
              onClick={() => setSelectedSubject(subject)}
              className="w-full rounded-xl border border-[#D8E8F7] p-4 text-left transition hover:bg-[#F8FBFF] hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-[#23405F]">
                    {subject.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#8CA0B5]">
                    Grade {subject.grade}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-[#4A90E2]">
                    {subject.marks}/100
                  </p>

                  <p className="mt-1 text-xs text-[#8CA0B5]">
                    View Details
                  </p>
                </div>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#EAF4FF]">
                <div
                  className="h-full rounded-full bg-[#4A90E2]"
                  style={{
                    width: `${subject.marks}%`,
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-5">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#23405F]">
                  {selectedSubject.name}
                </h2>

                <p className="mt-1 text-sm text-[#6B7F95]">
                  Performance Details
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSubject(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B7F95] hover:bg-[#DCEEFF] hover:text-[#4A90E2]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#F8FBFF] p-4">
                  <p className="text-xs text-[#8CA0B5]">
                    Marks
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#4A90E2]">
                    {selectedSubject.marks}/100
                  </p>
                </div>

                <div className="rounded-xl bg-[#F8FBFF] p-4">
                  <p className="text-xs text-[#8CA0B5]">
                    Grade
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#23405F]">
                    {selectedSubject.grade}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-[#F8FBFF] p-4">
                <p className="text-xs text-[#8CA0B5]">
                  Mentor Feedback
                </p>

                <p className="mt-2 text-sm leading-6 text-[#46627F]">
                  {selectedSubject.feedback}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-600">
                <CheckCircle2 size={18} />
                Subject successfully completed
              </div>

              <button
                type="button"
                onClick={() => setSelectedSubject(null)}
                className="w-full rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white hover:bg-[#3B7FCB]"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;