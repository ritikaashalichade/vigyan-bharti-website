import {
  BookOpen,
  FileText,
  PlayCircle,
  Search,
} from "lucide-react";

const resources = [
  {
    title: "Java Arrays",
    subject: "Data Structures",
    type: "Video Lecture",
    duration: "42 min",
    icon: PlayCircle,
  },
  {
    title: "DBMS SQL Basics",
    subject: "Database Management",
    type: "PDF Notes",
    duration: "18 pages",
    icon: FileText,
  },
  {
    title: "Operating Systems Introduction",
    subject: "Operating Systems",
    type: "Video Lecture",
    duration: "35 min",
    icon: PlayCircle,
  },
];

function Lectures() {
  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-3xl font-bold text-[#23405F]">
          Lectures & Resources
        </h1>

        <p className="mt-1 text-[#6B7F95]">
          Access your lectures, notes and study materials.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-[#D8E8F7] bg-white px-4 py-3">
        <Search size={18} className="text-[#6B7F95]" />

        <input
          type="text"
          placeholder="Search resources..."
          className="w-full bg-transparent text-sm text-[#23405F] outline-none placeholder:text-[#8CA0B5]"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <BookOpen size={24} className="text-[#4A90E2]" />

          <p className="mt-4 text-sm text-[#6B7F95]">
            Total Resources
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            24
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <PlayCircle size={24} className="text-[#4A90E2]" />

          <p className="mt-4 text-sm text-[#6B7F95]">
            Video Lectures
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            15
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <FileText size={24} className="text-[#4A90E2]" />

          <p className="mt-4 text-sm text-[#6B7F95]">
            Notes & PDFs
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            9
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {resources.map((resource) => {
          const Icon = resource.icon;

          return (
            <div
              key={resource.title}
              className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-[#DCEEFF] p-3">
                    <Icon
                      size={22}
                      className="text-[#4A90E2]"
                    />
                  </div>

                  <div>
                    <h2 className="font-semibold text-[#23405F]">
                      {resource.title}
                    </h2>

                    <p className="mt-1 text-sm text-[#6B7F95]">
                      {resource.subject}
                    </p>

                    <p className="mt-2 text-xs text-[#8CA0B5]">
                      {resource.type} • {resource.duration}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="rounded-xl bg-[#4A90E2] px-5 py-3 text-sm font-semibold text-white hover:bg-[#3B7FCB]"
                >
                  {resource.type === "Video Lecture"
                    ? "Watch Lecture"
                    : "Open Notes"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Lectures;