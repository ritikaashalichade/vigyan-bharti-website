import { useEffect, useState } from "react";
import {
  Bell,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Save,
  Settings as SettingsIcon,
} from "lucide-react";

type SettingsState = {
  emailNotifications: boolean;
  systemAlerts: boolean;
  maintenanceMode: boolean;
};

const defaultSettings: SettingsState = {
  emailNotifications: true,
  systemAlerts: true,
  maintenanceMode: false,
};

function Settings() {
  const [settings, setSettings] =
    useState<SettingsState>(() => {
      const saved = localStorage.getItem("vvm_admin_settings");

      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return defaultSettings;
        }
      }

      return defaultSettings;
    });

  const [saved, setSaved] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [passwordMessage, setPasswordMessage] =
    useState("");

  useEffect(() => {
    localStorage.setItem(
      "vvm_admin_settings",
      JSON.stringify(settings),
    );
  }, [settings]);

  const updateSetting = (
    key: keyof SettingsState,
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const handleSave = () => {
    localStorage.setItem(
      "vvm_admin_settings",
      JSON.stringify(settings),
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const handlePasswordUpdate = () => {
    if (!password || !confirmPassword) {
      setPasswordMessage(
        "Please fill both password fields.",
      );
      return;
    }

    if (password.length < 6) {
      setPasswordMessage(
        "Password must contain at least 6 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMessage(
        "Passwords do not match.",
      );
      return;
    }

    setPasswordMessage(
      "Admin password updated successfully.",
    );

    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-7">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-[#23405F]">
          Admin Settings
        </h1>

        <p className="mt-1 text-[#6B7F95]">
          Manage administration preferences and system settings.
        </p>
      </div>

      {/* SUCCESS MESSAGE */}
      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-600">
          <CheckCircle2 size={18} />
          Settings saved successfully.
        </div>
      )}

      <div className="max-w-4xl space-y-6">

        {/* GENERAL SETTINGS */}
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
                Manage basic administration information.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                Organization Name
              </label>

              <input
                type="text"
                value="Srijan"
                readOnly
                className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                System Name
              </label>

              <input
                type="text"
                value="Science Talent Search"
                readOnly
                className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none"
              />
            </div>

          </div>
        </div>

        {/* NOTIFICATION SETTINGS */}
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
                Notification Settings
              </h2>

              <p className="text-sm text-[#6B7F95]">
                Control system notifications and alerts.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">

            {/* EMAIL */}
            <div className="flex items-center justify-between">

              <div>
                <p className="font-semibold text-[#23405F]">
                  Email Notifications
                </p>

                <p className="mt-1 text-sm text-[#6B7F95]">
                  Send important updates through email.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  updateSetting("emailNotifications")
                }
                className={`relative h-6 w-11 rounded-full ${
                  settings.emailNotifications
                    ? "bg-[#4A90E2]"
                    : "bg-[#D8E8F7]"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    settings.emailNotifications
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>

            </div>

            <div className="border-t border-[#D8E8F7]" />

            {/* SYSTEM ALERTS */}
            <div className="flex items-center justify-between">

              <div>
                <p className="font-semibold text-[#23405F]">
                  System Alerts
                </p>

                <p className="mt-1 text-sm text-[#6B7F95]">
                  Receive alerts for important administrative events.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  updateSetting("systemAlerts")
                }
                className={`relative h-6 w-11 rounded-full ${
                  settings.systemAlerts
                    ? "bg-[#4A90E2]"
                    : "bg-[#D8E8F7]"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    settings.systemAlerts
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>

            </div>

          </div>
        </div>

        {/* SYSTEM CONTROLS */}
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
                System Controls
              </h2>

              <p className="text-sm text-[#6B7F95]">
                Manage platform availability.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-xl bg-[#F8FBFF] p-4">

            <div>
              <p className="font-semibold text-[#23405F]">
                Maintenance Mode
              </p>

              <p className="mt-1 text-sm text-[#6B7F95]">
                Temporarily restrict platform access during maintenance.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                updateSetting("maintenanceMode")
              }
              className={`relative h-6 w-11 rounded-full ${
                settings.maintenanceMode
                  ? "bg-[#4A90E2]"
                  : "bg-[#D8E8F7]"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  settings.maintenanceMode
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>

          </div>
        </div>

        {/* SECURITY */}
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
                Update the administrator password.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">

            {/* NEW PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                New Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter new password"
                  className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 pr-12 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8CA0B5] hover:text-[#4A90E2]"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#23405F]">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]"
              />
            </div>

            {passwordMessage && (
              <div
                className={`rounded-xl p-4 text-sm font-medium ${
                  passwordMessage.includes(
                    "successfully",
                  )
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {passwordMessage}
              </div>
            )}

            <button
              type="button"
              onClick={handlePasswordUpdate}
              className="rounded-xl border border-[#D8E8F7] px-5 py-3 text-sm font-semibold text-[#4A90E2] hover:bg-[#DCEEFF]"
            >
              Update Password
            </button>

          </div>
        </div>

        {/* SAVE */}
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-[#4A90E2] px-6 py-3 font-semibold text-white transition hover:bg-[#3B7FCB]"
        >
          <Save size={18} />
          Save Settings
        </button>

      </div>
    </div>
  );
}

export default Settings;