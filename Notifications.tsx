import { useState } from "react";
import {
  Bell,
  CheckCircle2,
  FileText,
  Megaphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  type: string;
  icon: typeof Bell;
  read: boolean;
  link: string;
};

export const defaultNotifications: Notification[] = [
  {
    id: 1,
    title: "Assignment submission evaluated",
    message:
      "Your Java Arrays Assignment has been evaluated. View your marks and mentor feedback.",
    time: "2 hours ago",
    type: "Submission",
    icon: FileText,
    read: false,
    link: "/student/submission-details/SUB-2048",
  },
  {
    id: 2,
    title: "New mentor response",
    message:
      "Your query regarding Arrays has received a response from your mentor.",
    time: "5 hours ago",
    type: "Query",
    icon: Megaphone,
    read: false,
    link: "/student/query-details/QRY-1024",
  },
  {
    id: 3,
    title: "Your result has been published",
    message:
      "Semester 5 results are now available. View your subject-wise performance.",
    time: "Yesterday",
    type: "Result",
    icon: CheckCircle2,
    read: true,
    link: "/student/results",
  },
];

function getNotifications(): Notification[] {
  const saved = localStorage.getItem("vvm_notifications");

  if (saved) {
    return JSON.parse(saved).map(
      (notification: Notification) => ({
        ...notification,
        icon:
          notification.type === "Submission"
            ? FileText
            : notification.type === "Query"
              ? Megaphone
              : CheckCircle2,
      }),
    );
  }

  localStorage.setItem(
    "vvm_notifications",
    JSON.stringify(
      defaultNotifications.map(({ icon, ...item }) => item),
    ),
  );

  return defaultNotifications;
}

function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState<Notification[]>(getNotifications);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const saveNotifications = (
    updatedNotifications: Notification[],
  ) => {
    setNotifications(updatedNotifications);

    localStorage.setItem(
      "vvm_notifications",
      JSON.stringify(
        updatedNotifications.map(
          ({ icon, ...item }) => item,
        ),
      ),
    );
  };

  const openNotification = (
    notification: Notification,
  ) => {
    const updatedNotifications = notifications.map(
      (item) =>
        item.id === notification.id
          ? { ...item, read: true }
          : item,
    );

    saveNotifications(updatedNotifications);

    navigate(notification.link);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(
      (notification) => ({
        ...notification,
        read: true,
      }),
    );

    saveNotifications(updatedNotifications);
  };

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#23405F]">
            Notifications
          </h1>

          <p className="mt-1 text-[#6B7F95]">
            Stay updated with announcements, reminders and academic updates.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="rounded-xl border border-[#D8E8F7] bg-white px-5 py-3 text-sm font-semibold text-[#4A90E2] hover:bg-[#DCEEFF]"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <Bell
              size={21}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Total Notifications
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {notifications.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-[#DCEEFF] p-3">
            <Bell
              size={21}
              className="text-[#4A90E2]"
            />
          </div>

          <p className="mt-4 text-sm text-[#6B7F95]">
            Unread
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {unreadCount}
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
            Read
          </p>

          <p className="mt-1 text-3xl font-bold text-[#23405F]">
            {notifications.length - unreadCount}
          </p>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon;

          return (
            <button
              key={notification.id}
              type="button"
              onClick={() =>
                openNotification(notification)
              }
              className={`w-full rounded-2xl border p-5 text-left shadow-sm transition hover:shadow-md ${
                notification.read
                  ? "border-[#D8E8F7] bg-white"
                  : "border-[#B9D9F5] bg-[#F8FBFF]"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-[#DCEEFF] p-3">
                  <Icon
                    size={21}
                    className="text-[#4A90E2]"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-[#23405F]">
                        {notification.title}
                      </h2>

                      {!notification.read && (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#4A90E2]" />
                      )}
                    </div>

                    <span className="text-xs text-[#8CA0B5]">
                      {notification.time}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-[#6B7F95]">
                    {notification.message}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="rounded-full bg-[#DCEEFF] px-3 py-1 text-xs font-semibold text-[#4A90E2]">
                      {notification.type}
                    </span>

                    <span className="text-xs font-semibold text-[#4A90E2]">
                      Open →
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Notifications;