import { useMemo, useState } from "react";
import {
  FileText,
  Link as LinkIcon,
  Plus,
  Search,
  Video,
  X,
} from "lucide-react";

type Resource = {
  id: string;
  title: string;
  type: "PDF" | "Video" | "Link";
  subject: string;
  uploadedOn: string;
  status: "Published" | "Draft";
};

const initialResources: Resource[] = [
  {
    id: "RES-4001",
    title: "Java Arrays Notes",
    type: "PDF",
    subject: "Data Structures",
    uploadedOn: "30 Sep 2026",
    status: "Published",
  },
  {
    id: "RES-4002",
    title: "SQL Joins Lecture",
    type: "Video",
    subject: "Database Management",
    uploadedOn: "29 Sep 2026",
    status: "Published",
  },
  {
    id: "RES-4003",
    title: "Operating Systems Reference",
    type: "Link",
    subject: "Operating Systems",
    uploadedOn: "27 Sep 2026",
    status: "Draft",
  },
];

function Resources() {
  const [resources, setResources] =
    useState<Resource[]>(initialResources);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "All" | "PDF" | "Video" | "Link"
  >("All");

  const [selected, setSelected] =
    useState<Resource | null>(null);

  const [showCreateForm, setShowCreateForm] =
    useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] =
    useState<"PDF" | "Video" | "Link">("PDF");
  const [newSubject, setNewSubject] = useState("");

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        resource.title.toLowerCase().includes(searchText) ||
        resource.subject.toLowerCase().includes(searchText);

      const matchesFilter =
        filter === "All" || resource.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [resources, search, filter]);

  const getIcon = (type: Resource["type"]) => {
    if (type === "PDF") return FileText;
    if (type === "Video") return Video;
    return LinkIcon;
  };

  const handleOpenCreate = () => {
    setSelected(null);
    setShowCreateForm(true);
  };

  const handleCloseCreate = () => {
    setShowCreateForm(false);
    setNewTitle("");
    setNewType("PDF");
    setNewSubject("");
  };

  const handleCreateResource = () => {
    if (!newTitle.trim()) {
      alert("Please enter resource title.");
      return;
    }

    if (!newSubject) {
      alert("Please select a subject.");
      return;
    }

    const newResource: Resource = {
      id: `RES-${4001 + resources.length}`,
      title: newTitle.trim(),
      type: newType,
      subject: newSubject,
      uploadedOn: "05 Oct 2026",
      status: "Published",
    };

    setResources((current) => [
      newResource,
      ...current,
    ]);

    handleCloseCreate();
  };

  return (
    <div className="space-y-7">

      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#23405F]">
            Resource Management
          </h1>

          <p className="mt-1 text-[#6B7F95]">
            Manage study materials, videos and useful learning links.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="relative z-10 flex items-center justify-center gap-2 rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white transition hover:bg-[#3B7FCB]"
        >
          <Plus size={18} />
          Add Resource
        </button>
      </div>

      {/* SEARCH + FILTER */}
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
            placeholder="Search resources..."
            className="w-full bg-transparent text-sm text-[#23405F] outline-none placeholder:text-[#8CA0B5]"
          />
        </div>

        <div className="flex gap-2">
          {(["All", "PDF", "Video", "Link"] as const).map(
            (option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
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

      {/* RESOURCE LIST */}
      <div className="space-y-4">

        {filteredResources.map((resource) => {
          const Icon = getIcon(resource.type);

          return (
            <div
              key={resource.id}
              className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div className="flex items-start gap-4">

                  <div className="rounded-xl bg-[#DCEEFF] p-3">
                    <Icon
                      size={21}
                      className="text-[#4A90E2]"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#23405F]">
                      {resource.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#6B7F95]">
                      {resource.subject}
                    </p>

                    <p className="mt-2 text-xs text-[#8CA0B5]">
                      {resource.id} • Uploaded{" "}
                      {resource.uploadedOn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      resource.status === "Published"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {resource.status}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setSelected(resource);
                    }}
                    className="rounded-xl border border-[#D8E8F7] px-4 py-2.5 text-sm font-semibold text-[#4A90E2] hover:bg-[#DCEEFF]"
                  >
                    View
                  </button>

                </div>
              </div>
            </div>
          );
        })}

        {filteredResources.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#D8E8F7] bg-white p-10 text-center">
            <p className="font-semibold text-[#23405F]">
              No resources found
            </p>

            <p className="mt-1 text-sm text-[#6B7F95]">
              Try another search or filter.
            </p>
          </div>
        )}
      </div>

      {/* VIEW MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-5"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-start justify-between">

              <div>
                <h2 className="text-xl font-bold text-[#23405F]">
                  Resource Details
                </h2>

                <p className="mt-1 text-sm text-[#6B7F95]">
                  {selected.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B7F95] hover:bg-[#DCEEFF] hover:text-[#4A90E2]"
              >
                <X size={18} />
              </button>

            </div>

            <div className="mt-6 space-y-4">

              <div className="rounded-xl bg-[#F8FBFF] p-4">
                <p className="text-xs text-[#8CA0B5]">
                  Title
                </p>

                <p className="mt-1 font-semibold text-[#23405F]">
                  {selected.title}
                </p>
              </div>

              <div className="rounded-xl bg-[#F8FBFF] p-4">
                <p className="text-xs text-[#8CA0B5]">
                  Type
                </p>

                <p className="mt-1 font-semibold text-[#23405F]">
                  {selected.type}
                </p>
              </div>

              <div className="rounded-xl bg-[#F8FBFF] p-4">
                <p className="text-xs text-[#8CA0B5]">
                  Subject
                </p>

                <p className="mt-1 font-semibold text-[#23405F]">
                  {selected.subject}
                </p>
              </div>

              <div className="rounded-xl bg-[#F8FBFF] p-4">
                <p className="text-xs text-[#8CA0B5]">
                  Status
                </p>

                <p className="mt-1 font-semibold text-[#23405F]">
                  {selected.status}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="w-full rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white hover:bg-[#3B7FCB]"
              >
                Close
              </button>

            </div>
          </div>
        </div>
      )}

      {/* ADD RESOURCE MODAL */}
      {showCreateForm && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 p-5"
          onClick={handleCloseCreate}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-start justify-between">

              <div>
                <h2 className="text-xl font-bold text-[#23405F]">
                  Add Resource
                </h2>

                <p className="mt-1 text-sm text-[#6B7F95]">
                  Add a new learning resource.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseCreate}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B7F95] hover:bg-[#DCEEFF] hover:text-[#4A90E2]"
              >
                <X size={18} />
              </button>

            </div>

            <div className="mt-6 space-y-5">

              {/* TITLE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                  Resource Title
                </label>

                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) =>
                    setNewTitle(e.target.value)
                  }
                  placeholder="Enter resource title"
                  className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
                />
              </div>

              {/* TYPE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                  Resource Type
                </label>

                <select
                  value={newType}
                  onChange={(e) =>
                    setNewType(
                      e.target.value as
                        | "PDF"
                        | "Video"
                        | "Link",
                    )
                  }
                  className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
                >
                  <option value="PDF">PDF</option>
                  <option value="Video">Video</option>
                  <option value="Link">Link</option>
                </select>
              </div>

              {/* SUBJECT */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                  Subject
                </label>

                <select
                  value={newSubject}
                  onChange={(e) =>
                    setNewSubject(e.target.value)
                  }
                  className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
                >
                  <option value="">
                    Select Subject
                  </option>

                  <option value="Data Structures">
                    Data Structures
                  </option>

                  <option value="Database Management">
                    Database Management
                  </option>

                  <option value="Operating Systems">
                    Operating Systems
                  </option>

                  <option value="Java Programming">
                    Java Programming
                  </option>

                  <option value="Computer Networks">
                    Computer Networks
                  </option>
                </select>
              </div>

              {/* BUTTON */}
              <button
                type="button"
                onClick={handleCreateResource}
                className="w-full rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white transition hover:bg-[#3B7FCB]"
              >
                Add Resource
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Resources;