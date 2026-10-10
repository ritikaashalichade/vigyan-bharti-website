import { useState } from "react";
import {
  CheckCircle2,
  FileText,
  GraduationCap,
  IndianRupee,
  X,
} from "lucide-react";

type ScholarshipData = {
  title: string;
  description: string;
  benefit: string;
  eligibility: string;
};

const scholarships: ScholarshipData[] = [
  {
    title: "Merit Scholarship",
    description:
      "Academic performance based scholarship for students with strong academic records.",
    benefit: "₹25,000",
    eligibility:
      "Students with good academic performance and consistent semester results.",
  },
  {
    title: "Need-Based Scholarship",
    description:
      "Financial assistance for eligible students who require educational support.",
    benefit: "₹50,000",
    eligibility:
      "Students meeting the required financial and academic eligibility criteria.",
  },
];

function Scholarship() {
  const [selectedScholarship, setSelectedScholarship] =
    useState<ScholarshipData | null>(null);

  const [applied, setApplied] = useState<string[]>(() => {
    const saved = localStorage.getItem("vvm_scholarships");

    return saved ? JSON.parse(saved) : [];
  });

  const handleApply = (title: string) => {
    if (applied.includes(title)) {
      return;
    }

    const updatedApplied = [...applied, title];

    setApplied(updatedApplied);

    localStorage.setItem(
      "vvm_scholarships",
      JSON.stringify(updatedApplied),
    );
  };

  const isApplied = selectedScholarship
    ? applied.includes(selectedScholarship.title)
    : false;

  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#23405F]">
          Scholarship
        </h1>

        <p className="mt-1 text-[#6B7F95]">
          View scholarship opportunities, eligibility and application status.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <GraduationCap
              size={22}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Available Scholarships
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {scholarships.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <IndianRupee
              size={22}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Maximum Benefit
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            ₹50K
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
            Applications
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {applied.length}
          </p>
        </div>
      </div>

      {/* Scholarship List */}
      <div className="space-y-4">
        {scholarships.map((scholarship) => {
          const alreadyApplied = applied.includes(
            scholarship.title,
          );

          return (
            <div
              key={scholarship.title}
              className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-[#DCEEFF] p-3">
                    <GraduationCap
                      size={22}
                      className="text-[#4A90E2]"
                    />
                  </div>

                  <div>
                    <h2 className="font-semibold text-[#23405F]">
                      {scholarship.title}
                    </h2>

                    <p className="mt-1 text-sm text-[#6B7F95]">
                      {scholarship.description}
                    </p>

                    <p className="mt-2 text-sm font-medium text-[#4A90E2]">
                      Benefit: {scholarship.benefit}
                    </p>

                    {alreadyApplied && (
                      <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <CheckCircle2 size={14} />
                        Application Submitted
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedScholarship(scholarship)
                    }
                    className="rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-5 py-3 text-sm font-semibold text-[#4A90E2] hover:bg-[#DCEEFF]"
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApply(scholarship.title)}
                    disabled={alreadyApplied}
                    className={`rounded-xl px-5 py-3 text-sm font-semibold text-white ${
                      alreadyApplied
                        ? "cursor-not-allowed bg-emerald-500"
                        : "bg-[#4A90E2] hover:bg-[#3B7FCB]"
                    }`}
                  >
                    {alreadyApplied ? "Applied" : "Apply Now"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      {selectedScholarship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-5">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#23405F]">
                  {selectedScholarship.title}
                </h2>

                <p className="mt-1 text-sm text-[#6B7F95]">
                  Scholarship Details
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedScholarship(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B7F95] hover:bg-[#DCEEFF] hover:text-[#4A90E2]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <div className="rounded-xl bg-[#F8FBFF] p-4">
                <p className="text-xs text-[#8CA0B5]">
                  Description
                </p>

                <p className="mt-2 text-sm leading-6 text-[#46627F]">
                  {selectedScholarship.description}
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-[#F8FBFF] p-4">
                <IndianRupee
                  size={20}
                  className="text-[#4A90E2]"
                />

                <div>
                  <p className="text-xs text-[#8CA0B5]">
                    Scholarship Benefit
                  </p>

                  <p className="mt-1 font-semibold text-[#23405F]">
                    {selectedScholarship.benefit}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-[#F8FBFF] p-4">
                <FileText
                  size={20}
                  className="mt-1 text-[#4A90E2]"
                />

                <div>
                  <p className="text-xs text-[#8CA0B5]">
                    Eligibility
                  </p>

                  <p className="mt-1 text-sm leading-6 text-[#46627F]">
                    {selectedScholarship.eligibility}
                  </p>
                </div>
              </div>

              {isApplied && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-600">
                  <CheckCircle2 size={18} />
                  Your application has been submitted.
                </div>
              )}

              <button
                type="button"
                onClick={() =>
                  handleApply(selectedScholarship.title)
                }
                disabled={isApplied}
                className={`w-full rounded-xl px-4 py-3 font-semibold text-white ${
                  isApplied
                    ? "cursor-not-allowed bg-emerald-500"
                    : "bg-[#4A90E2] hover:bg-[#3B7FCB]"
                }`}
              >
                {isApplied
                  ? "Application Submitted"
                  : "Apply Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Scholarship;