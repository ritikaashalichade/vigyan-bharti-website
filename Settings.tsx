import { useState } from "react";
import { Link } from "react-router-dom";
import { changePassword, fullName, getCurrentUser, useStore } from "../../lib/store";
import {
  Bell,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Save,
  Settings as SettingsIcon,
  X,
} from "lucide-react";

function Settings() {
  useStore();
  const user = getCurrentUser();
  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [assignmentNotifications, setAssignmentNotifications] =
    useState(true);

  const [saved, setSaved] = useState(false);

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [passwordUpdated, setPasswordUpdated] =
    useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const handlePasswordUpdate = () => {
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      alert("Please fill all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    const error = user
      ? changePassword(user.email, currentPassword, newPassword)
      : "Please log in again.";

    if (error) {
      alert(error);
      return;
    }

    setPasswordUpdated(true);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordUpdated(false);
    }, 2000);
  };

  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#23405F]">
          Settings
        </h1>

        <p className="mt-1 text-[#6B7F95]">
          Manage your account preferences and notifications.
        </p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-600">
          <CheckCircle2 size={18} />
          Settings saved successfully.
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl space-y-6">
        {/* General Settings */}
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#DCEEFF] p-3">
              <SettingsIcon
                size={21}
                className="text-[#4A90E2]"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#23405F]">
                General Settings
              </h2>

              <p className="text-sm text-[#6B7F95]">
                Manage your account preferences.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                Display Name
              </label>

              <input
                type="text"
                value={user ? fullName(user) : ""}
                readOnly
                className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none"
              />

              <Link
                to="/student/profile"
                className="mt-2 inline-block text-sm font-semibold text-[#4A90E2] hover:underline"
              >
                Edit my profile
              </Link>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                Language
              </label>

              <select
                className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none"
              >
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#DCEEFF] p-3">
              <Bell
                size={21}
                className="text-[#4A90E2]"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#23405F]">
                Notification Preferences
              </h2>

              <p className="text-sm text-[#6B7F95]">
                Choose which notifications you want to receive.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {/* Email */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#23405F]">
                  Email Notifications
                </p>

                <p className="mt-1 text-sm text-[#6B7F95]">
                  Receive important updates through email.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEmailNotifications(
                    !emailNotifications,
                  )
                }
                className={`relative h-6 w-11 rounded-full ${
                  emailNotifications
                    ? "bg-[#4A90E2]"
                    : "bg-[#D8E8F7]"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    emailNotifications
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="border-t border-[#D8E8F7]" />

            {/* Assignment */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#23405F]">
                  Assignment Notifications
                </p>

                <p className="mt-1 text-sm text-[#6B7F95]">
                  Get reminders about assignments and deadlines.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setAssignmentNotifications(
                    !assignmentNotifications,
                  )
                }
                className={`relative h-6 w-11 rounded-full ${
                  assignmentNotifications
                    ? "bg-[#4A90E2]"
                    : "bg-[#D8E8F7]"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    assignmentNotifications
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#DCEEFF] p-3">
              <Lock
                size={21}
                className="text-[#4A90E2]"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#23405F]">
                Security
              </h2>

              <p className="text-sm text-[#6B7F95]">
                Manage your account security.
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-xl bg-[#F8FBFF] p-4">
            <div>
              <p className="font-semibold text-[#23405F]">
                Password
              </p>

              <p className="mt-1 text-sm text-[#6B7F95]">
                Keep your account secure.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="rounded-xl border border-[#D8E8F7] px-4 py-2 text-sm font-semibold text-[#4A90E2] hover:bg-[#DCEEFF]"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Save */}
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-[#4A90E2] px-6 py-3 font-semibold text-white hover:bg-[#3B7FCB]"
        >
          <Save size={18} />
          Save Settings
        </button>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-5">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#23405F]">
                  Change Password
                </h2>

                <p className="mt-1 text-sm text-[#6B7F95]">
                  Update your account password.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowPasswordModal(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B7F95] hover:bg-[#DCEEFF] hover:text-[#4A90E2]"
              >
                <X size={18} />
              </button>
            </div>

            {passwordUpdated ? (
              <div className="mt-6 rounded-xl bg-emerald-50 p-5 text-center">
                <CheckCircle2
                  size={28}
                  className="mx-auto text-emerald-600"
                />

                <p className="mt-3 font-semibold text-emerald-600">
                  Password updated successfully.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {/* Current Password */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                    Current Password
                  </label>

                  <div className="relative">
                    <input
                      type={
                        showCurrentPassword
                          ? "text"
                          : "password"
                      }
                      value={currentPassword}
                      onChange={(e) =>
                        setCurrentPassword(e.target.value)
                      }
                      className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 pr-12 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(
                          !showCurrentPassword,
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8CA0B5] hover:text-[#4A90E2]"
                    >
                      {showCurrentPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                    New Password
                  </label>

                  <div className="relative">
                    <input
                      type={
                        showNewPassword
                          ? "text"
                          : "password"
                      }
                      value={newPassword}
                      onChange={(e) =>
                        setNewPassword(e.target.value)
                      }
                      className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 pr-12 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword(
                          !showNewPassword,
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8CA0B5] hover:text-[#4A90E2]"
                    >
                      {showNewPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 pr-12 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword,
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8CA0B5] hover:text-[#4A90E2]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePasswordUpdate}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A90E2] px-5 py-3 font-semibold text-white hover:bg-[#3B7FCB]"
                >
                  <Lock size={17} />
                  Update Password
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;