import { useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  FileText,
  X,
} from "lucide-react";

type Acknowledgement = {
  id: number;
  title: string;
  description: string;
  date: string;
  status: string;
  details: string;
};

const acknowledgements: Acknowledgement[] = [
  {
    id: 1,
    title: "Assignment Submission Acknowledgement",
    description: "Java Arrays Assignment",
    date: "30 Sep 2026",
    status: "Acknowledged",
    details:
      "Your Java Arrays Assignment submission has been successfully received and acknowledged by the system.",
  },
  {
    id: 2,
    title: "Query Resolution Acknowledgement",
    description: "Doubt regarding Arrays",
    date: "29 Sep 2026",
    status: "Acknowledged",
    details:
      "Your query regarding the two pointer approach was reviewed and the mentor response has been recorded.",
  },
  {
    id: 3,
    title: "Semester Result Acknowledgement",
    description: "Semester 5 Result",
    date: "28 Sep 2026",
    status: "Acknowledged",
    details:
      "Your Semester 5 result has been published and the acknowledgement has been recorded successfully.",
  },
];

function Acknowledgements() {
  const [selectedAcknowledgement, setSelectedAcknowledgement] =
    useState<Acknowledgement | null>(null);

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-3xl font-bold text-[#23405F]">
          Acknowledgements
        </h1>

        <p className="mt-1 text-[#6B7F95]">
          View your submitted and acknowledged academic activities.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <BadgeCheck
              size={21}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Total Acknowledgements
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {acknowledgements.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <CheckCircle2
              size={21}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Acknowledged
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {acknowledgements.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <CalendarDays
              size={21}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Latest Activity
          </p>

          <p className="mt-1 text-lg font-bold text-[#23405F]">
            30 Sep 2026
          </p>
        </div>
      </div>

      {/* Acknowledgement List */}
      <div className="space-y-4">
        {acknowledgements.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedAcknowledgement(item)}
            className="w-full rounded-2xl border border-[#D8E8F7] bg-white p-6 text-left shadow-sm transition hover:shadow-md hover:bg-[#F8FBFF]"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-[#DCEEFF] p-3">
                  <BadgeCheck
                    size={23}
                    className="text-[#4A90E2]"
                  />
                </div>

                <div>
                  <h2 className="font-semibold text-[#23405F]">
                    {item.title}
                  </h2>

                  <p className="mt-1 text-sm text-[#6B7F95]">
                    {item.description}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs text-[#8CA0B5]">
                    <CalendarDays size={14} />
                    {item.date}
                  </div>
                </div>
              </div>

              <span className="flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-600">
                <CheckCircle2 size={14} />
                {item.status}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Details Modal */}
      {selectedAcknowledgement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-5">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#23405F]">
                  {selectedAcknowledgement.title}
                </h2>

                <p className="mt-1 text-sm text-[#6B7F95]">
                  Acknowledgement Details
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAcknowledgement(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B7F95] hover:bg-[#DCEEFF] hover:text-[#4A90E2]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-[#F8FBFF] p-4">
                <p className="text-xs text-[#8CA0B5]">
                  Activity
                </p>

                <p className="mt-1 font-semibold text-[#23405F]">
                  {selectedAcknowledgement.description}
                </p>
              </div>

              <div className="rounded-xl bg-[#F8FBFF] p-4">
                <p className="text-xs text-[#8CA0B5]">
                  Date
                </p>

                <p className="mt-1 font-semibold text-[#23405F]">
                  {selectedAcknowledgement.date}
                </p>
              </div>

              <div className="rounded-xl bg-[#F8FBFF] p-4">
                <p className="text-xs text-[#8CA0B5]">
                  Details
                </p>

                <p className="mt-2 text-sm leading-6 text-[#46627F]">
                  {selectedAcknowledgement.details}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-600">
                <CheckCircle2 size={18} />
                Acknowledgement confirmed
              </div>

              <button
                type="button"
                onClick={() => setSelectedAcknowledgement(null)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white hover:bg-[#3B7FCB]"
              >
                <FileText size={17} />
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Acknowledgements;