import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Download,
  FileText,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";

const activityData = [
  {
    label: "Assignments",
    value: 82,
  },
  {
    label: "Submissions",
    value: 76,
  },
  {
    label: "Evaluations",
    value: 68,
  },
  {
    label: "Mentor Allocation",
    value: 92,
  },
];

function downloadCSV(
  filename: string,
  rows: string[][],
) {
  const csvContent = rows
    .map((row) =>
      row
        .map((cell) => `"${cell.replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

function Reports() {
  const handleExportAll = () => {
    downloadCSV("srijan-report.csv", [
      ["Report", "Value"],
      ["Total Students", "248"],
      ["Active Mentors", "24"],
      ["Completed Activities", "1284"],
      ["Evaluation Rate", "84%"],
      ["Total Assignments", "36"],
      ["Total Submissions", "1482"],
      ["Pending Evaluations", "18"],
      ["Certificates Issued", "124"],
    ]);
  };

  const handleStudentReport = () => {
    downloadCSV("student-progress-report.csv", [
      ["Metric", "Value"],
      ["Total Students", "248"],
      ["Assignments Completion", "82%"],
      ["Submission Rate", "76%"],
      ["Evaluation Rate", "68%"],
    ]);
  };

  const handleMentorReport = () => {
    downloadCSV("mentor-activity-report.csv", [
      ["Metric", "Value"],
      ["Active Mentors", "24"],
      ["Mentor Allocation", "92%"],
      ["Pending Evaluations", "18"],
    ]);
  };

  const handleAssignmentReport = () => {
    downloadCSV("assignment-report.csv", [
      ["Metric", "Value"],
      ["Total Assignments", "36"],
      ["Total Submissions", "1482"],
      ["Pending Evaluations", "18"],
      ["Assignment Completion", "82%"],
    ]);
  };

  const handleScholarshipReport = () => {
    downloadCSV("scholarship-report.csv", [
      ["Metric", "Value"],
      ["Total Scholarships", "3"],
      ["Open Scholarships", "2"],
      ["Total Applicants", "129"],
    ]);
  };

  return (
    <div className="space-y-7">

      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#23405F]">
            Reports & Analytics
          </h1>

          <p className="mt-1 text-[#6B7F95]">
            Monitor internship statistics, performance and progress.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportAll}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white transition hover:bg-[#3B7FCB]"
        >
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <Users
              size={22}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Total Students
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            248
          </p>

          <p className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
            <TrendingUp size={13} />
            12% increase
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <GraduationCap
              size={22}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Active Mentors
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            24
          </p>

          <p className="mt-2 text-xs text-[#6B7F95]">
            Currently active
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <ClipboardList
              size={22}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Completed Activities
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            1,284
          </p>

          <p className="mt-2 text-xs text-[#6B7F95]">
            Across all students
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
            Evaluation Rate
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            84%
          </p>

          <p className="mt-2 text-xs text-emerald-600">
            Above target
          </p>
        </div>

      </div>

      {/* PROGRESS */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#DCEEFF] p-3">
              <BarChart3
                size={21}
                className="text-[#4A90E2]"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#23405F]">
                Internship Progress
              </h2>

              <p className="text-sm text-[#6B7F95]">
                Current completion levels
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-6">

            {activityData.map((item) => (
              <div key={item.label}>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#46627F]">
                    {item.label}
                  </span>

                  <span className="text-sm font-semibold text-[#23405F]">
                    {item.value}%
                  </span>
                </div>

                <div className="mt-2 h-2.5 rounded-full bg-[#EAF4FF]">
                  <div
                    className="h-full rounded-full bg-[#4A90E2]"
                    style={{
                      width: `${item.value}%`,
                    }}
                  />
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* ACTIVITY SUMMARY */}
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#DCEEFF] p-3">
              <FileText
                size={21}
                className="text-[#4A90E2]"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#23405F]">
                Activity Summary
              </h2>

              <p className="text-sm text-[#6B7F95]">
                Internship activity overview
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">

            <div className="flex items-center justify-between rounded-xl bg-[#F8FBFF] p-4">
              <span className="text-sm text-[#46627F]">
                Total Assignments
              </span>

              <span className="font-bold text-[#23405F]">
                36
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#F8FBFF] p-4">
              <span className="text-sm text-[#46627F]">
                Total Submissions
              </span>

              <span className="font-bold text-[#23405F]">
                1,482
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#F8FBFF] p-4">
              <span className="text-sm text-[#46627F]">
                Pending Evaluations
              </span>

              <span className="font-bold text-[#23405F]">
                18
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#F8FBFF] p-4">
              <span className="text-sm text-[#46627F]">
                Certificates Issued
              </span>

              <span className="font-bold text-[#23405F]">
                124
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* REPORT CARDS */}
      <div className="rounded-2xl border border-[#D8E8F7] bg-white shadow-sm">

        <div className="border-b border-[#D8E8F7] px-6 py-5">
          <h2 className="text-lg font-bold text-[#23405F]">
            Available Reports
          </h2>

          <p className="mt-1 text-sm text-[#6B7F95]">
            Reports that can be generated for administration.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">

          <button
            type="button"
            onClick={handleStudentReport}
            className="flex items-center justify-between rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] p-5 text-left hover:bg-[#DCEEFF]"
          >
            <div>
              <p className="font-semibold text-[#23405F]">
                Student Progress Report
              </p>

              <p className="mt-1 text-xs text-[#6B7F95]">
                Student participation and completion status
              </p>
            </div>

            <Download
              size={19}
              className="text-[#4A90E2]"
            />
          </button>

          <button
            type="button"
            onClick={handleMentorReport}
            className="flex items-center justify-between rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] p-5 text-left hover:bg-[#DCEEFF]"
          >
            <div>
              <p className="font-semibold text-[#23405F]">
                Mentor Activity Report
              </p>

              <p className="mt-1 text-xs text-[#6B7F95]">
                Mentor allocations and evaluations
              </p>
            </div>

            <Download
              size={19}
              className="text-[#4A90E2]"
            />
          </button>

          <button
            type="button"
            onClick={handleAssignmentReport}
            className="flex items-center justify-between rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] p-5 text-left hover:bg-[#DCEEFF]"
          >
            <div>
              <p className="font-semibold text-[#23405F]">
                Assignment Report
              </p>

              <p className="mt-1 text-xs text-[#6B7F95]">
                Assignment submission and evaluation statistics
              </p>
            </div>

            <Download
              size={19}
              className="text-[#4A90E2]"
            />
          </button>

          <button
            type="button"
            onClick={handleScholarshipReport}
            className="flex items-center justify-between rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] p-5 text-left hover:bg-[#DCEEFF]"
          >
            <div>
              <p className="font-semibold text-[#23405F]">
                Scholarship Report
              </p>

              <p className="mt-1 text-xs text-[#6B7F95]">
                Applications and scholarship status
              </p>
            </div>

            <Download
              size={19}
              className="text-[#4A90E2]"
            />
          </button>

        </div>
      </div>

    </div>
  );
}

export default Reports;