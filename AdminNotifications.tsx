import { useEffect, useState } from "react";
import {
  Bell,
  Megaphone,
  Plus,
  Send,
  X,
} from "lucide-react";

type Announcement = {
  id: string;
  title: string;
  message: string;
  audience: string;
  date: string;
  status: "Published" | "Draft";
};

const initialAnnouncements: Announcement[] = [
  {
    id: "ANN-5001",
    title: "SRIJAN Activity Update",
    message:
      "The next internship activity and submission schedule has been published.",
    audience: "All Students",
    date: "30 Sep 2026",
    status: "Published",
  },
  {
    id: "ANN-5002",
    title: "Mentor Meeting Reminder",
    message:
      "Mentors are requested to review pending student submissions this week.",
    audience: "Mentors",
    date: "29 Sep 2026",
    status: "Published",
  },
  {
    id: "ANN-5003",
    title: "Scholarship Application Window",
    message:
      "Scholarship applications will remain open for eligible students.",
    audience: "All Students",
    date: "28 Sep 2026",
    status: "Draft",
  },
];

function Notifications() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem("vvm_admin_announcements");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialAnnouncements;
      }
    }

    return initialAnnouncements;
  });

  const [showForm, setShowForm] = useState(false);

  const [selected, setSelected] =
    useState<Announcement | null>(null);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("All Students");

  useEffect(() => {
    localStorage.setItem(
      "vvm_admin_announcements",
      JSON.stringify(announcements),
    );
  }, [announcements]);

  const handleOpenForm = () => {
    setSelected(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setTitle("");
    setMessage("");
    setAudience("All Students");
  };

  const handlePublish = () => {
    if (!title.trim()) {
      alert("Please enter announcement title.");
      return;
    }

    if (!message.trim()) {
      alert("Please enter announcement message.");
      return;
    }

    const newAnnouncement: Announcement = {
      id: `ANN-${5000 + announcements.length + 1}`,
      title: title.trim(),
      message: message.trim(),
      audience,
      date: "05 Oct 2026",
      status: "Published",
    };

    setAnnouncements((current) => [
      newAnnouncement,
      ...current,
    ]);

    handleCloseForm();
  };

  return (
    <div className="space-y-7">

      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#23405F]">
            Notifications & Announcements
          </h1>

          <p className="mt-1 text-[#6B7F95]">
            Create and manage important updates for students and mentors.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenForm}
          className="relative z-10 flex items-center justify-center gap-2 rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white transition hover:bg-[#3B7FCB]"
        >
          <Plus size={18} />
          Create Announcement
        </button>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <Bell
              size={22}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Total Announcements
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {announcements.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <Megaphone
              size={22}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Published
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {
              announcements.filter(
                (item) => item.status === "Published",
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <Bell
              size={22}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Drafts
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {
              announcements.filter(
                (item) => item.status === "Draft",
              ).length
            }
          </p>
        </div>

      </div>

      {/* ANNOUNCEMENT LIST */}
      <div className="space-y-4">

        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-[#DCEEFF] p-3">
                  <Megaphone
                    size={21}
                    className="text-[#4A90E2]"
                  />
                </div>

                <div>
                  <h2 className="font-semibold text-[#23405F]">
                    {announcement.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#6B7F95]">
                    {announcement.message}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#8CA0B5]">
                    <span>{announcement.id}</span>

                    <span>
                      Audience: {announcement.audience}
                    </span>

                    <span>{announcement.date}</span>
                  </div>
                </div>

              </div>

              <div className="flex items-center gap-3">

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    announcement.status === "Published"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {announcement.status}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setSelected(announcement)
                  }
                  className="rounded-xl border border-[#D8E8F7] px-4 py-2.5 text-sm font-semibold text-[#4A90E2] hover:bg-[#DCEEFF]"
                >
                  View
                </button>

              </div>
            </div>
          </div>
        ))}

      </div>

      {/* CREATE ANNOUNCEMENT MODAL */}
      {showForm && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 p-5"
          onClick={handleCloseForm}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-start justify-between">

              <div>
                <h2 className="text-xl font-bold text-[#23405F]">
                  Create Announcement
                </h2>

                <p className="mt-1 text-sm text-[#6B7F95]">
                  Publish an update for students or mentors.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseForm}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B7F95] hover:bg-[#DCEEFF] hover:text-[#4A90E2]"
              >
                <X size={18} />
              </button>

            </div>

            <div className="mt-6 space-y-5">

              {/* TITLE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                  Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Announcement title"
                  className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
                />
              </div>

              {/* AUDIENCE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                  Audience
                </label>

                <select
                  value={audience}
                  onChange={(e) =>
                    setAudience(e.target.value)
                  }
                  className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
                >
                  <option value="All Students">
                    All Students
                  </option>

                  <option value="Mentors">
                    Mentors
                  </option>

                  <option value="All Users">
                    All Users
                  </option>
                </select>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                  Message
                </label>

                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder="Write announcement message..."
                  className="w-full resize-none rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
                />
              </div>

              {/* PUBLISH */}
              <button
                type="button"
                onClick={handlePublish}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white transition hover:bg-[#3B7FCB]"
              >
                <Send size={17} />
                Publish Announcement
              </button>

            </div>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
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
                  Announcement Details
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
                  Audience
                </p>

                <p className="mt-1 font-semibold text-[#23405F]">
                  {selected.audience}
                </p>
              </div>

              <div className="rounded-xl bg-[#F8FBFF] p-4">
                <p className="text-xs text-[#8CA0B5]">
                  Message
                </p>

                <p className="mt-2 text-sm leading-6 text-[#46627F]">
                  {selected.message}
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

    </div>
  );
}

export default Notifications;