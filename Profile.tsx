import { useRef, useState } from "react";
import { Camera, CheckCircle2, Save, Trash2 } from "lucide-react";
import Avatar from "../../components/Avatar";
import { fileToAvatar } from "../../lib/image";
import { fullName, getCurrentUser, updateUser, useStore } from "../../lib/store";

const input =
  "w-full rounded-xl border border-[#D8E8F7] bg-[#F8FBFF] px-4 py-3 text-sm text-[#23405F] outline-none focus:border-[#4A90E2]";
const readonly = `${input} cursor-not-allowed text-[#6B7F95]`;
const label = "mb-2 block text-sm font-semibold text-[#23405F]";

function Profile() {
  useStore();
  const user = getCurrentUser();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState(() => ({
    first: user?.first ?? "", last: user?.last ?? "",
    phone: user?.phone ?? "", dob: user?.dob ?? "", gender: user?.gender ?? "",
    school: user?.school ?? "", cls: user?.cls ?? "", sec: user?.sec ?? "",
    address: user?.address ?? "", city: user?.city ?? "", state: user?.state ?? "",
    guardian: user?.guardian ?? "", guardianPhone: user?.guardianPhone ?? "",
    bio: user?.bio ?? "",
  }));
  const [photo, setPhoto] = useState(user?.photo ?? "");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const set = (k: keyof typeof form) => (v: string) => { setForm((p) => ({ ...p, [k]: v })); setSaved(false); };
  const text = (k: keyof typeof form, placeholder = "", type = "text") => (
    <input type={type} value={form[k]} onChange={(e) => set(k)(e.target.value)} placeholder={placeholder} className={input} />
  );

  const choosePhoto = async (file?: File) => {
    if (!file) return;
    try {
      setPhoto(await fileToAvatar(file));
      setError(""); setSaved(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not use that picture.");
    }
  };

  const save = () => {
    const err = updateUser(user.email, { ...form, photo: photo || undefined });
    if (err) { setError(err); setSaved(false); return; }
    setError(""); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const preview = { first: form.first, last: form.last, photo };

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-3xl font-bold text-[#23405F]">My Profile</h1>
        <p className="mt-1 text-[#6B7F95]">Add your photo and keep your details up to date.</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-600">
          <CheckCircle2 size={18} /> Profile saved successfully.
        </div>
      )}
      {error && <div className="rounded-xl bg-red-50 px-5 py-4 text-sm font-medium text-red-600">{error}</div>}

      <div className="max-w-4xl space-y-6">
        {/* Photo */}
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm sm:flex-row">
          <Avatar user={preview} size={112} />
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-[#23405F]">{fullName(preview) || "Your name"}</h2>
            <p className="mt-1 text-sm text-[#6B7F95]">{user.sid} · Student</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
              <button type="button" onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 rounded-xl bg-[#4A90E2] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3B7FCB]">
                <Camera size={17} /> {photo ? "Change picture" : "Upload picture"}
              </button>
              {photo && (
                <button type="button" onClick={() => { setPhoto(""); setSaved(false); }}
                  className="flex items-center gap-2 rounded-xl border border-[#D8E8F7] px-4 py-2.5 text-sm font-semibold text-[#46627F] hover:bg-[#DCEEFF]">
                  <Trash2 size={17} /> Remove
                </button>
              )}
            </div>
            <p className="mt-2 text-xs text-[#8CA0B5]">JPG or PNG. It is cropped to a square automatically.</p>
            <input ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { void choosePhoto(e.target.files?.[0]); e.target.value = ""; }} />
          </div>
        </div>

        {/* Personal */}
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#23405F]">Personal details</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div><label className={label}>First name</label>{text("first")}</div>
            <div><label className={label}>Last name</label>{text("last")}</div>
            <div><label className={label}>Email</label><input value={user.email} readOnly className={readonly} /></div>
            <div><label className={label}>Student ID</label><input value={user.sid} readOnly className={readonly} /></div>
            <div><label className={label}>Phone</label>{text("phone", "10-digit mobile number", "tel")}</div>
            <div><label className={label}>Date of birth</label>{text("dob", "", "date")}</div>
            <div>
              <label className={label}>Gender</label>
              <select value={form.gender} onChange={(e) => set("gender")(e.target.value)} className={input}>
                <option value="">Prefer not to say</option>
                <option>Female</option><option>Male</option><option>Other</option>
              </select>
            </div>
          </div>
          <p className="mt-4 text-xs text-[#8CA0B5]">Email and Student ID can only be changed by the administrator.</p>
        </div>

        {/* School */}
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#23405F]">School</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <div className="md:col-span-3"><label className={label}>School name</label>{text("school")}</div>
            <div><label className={label}>Class</label>{text("cls")}</div>
            <div><label className={label}>Section</label>{text("sec")}</div>
          </div>
        </div>

        {/* Address */}
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#23405F]">Address</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2"><label className={label}>Address</label>{text("address", "House no., street, area")}</div>
            <div><label className={label}>City</label>{text("city")}</div>
            <div><label className={label}>State</label>{text("state")}</div>
          </div>
        </div>

        {/* Guardian + about */}
        <div className="rounded-2xl border border-[#D8E8F7] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#23405F]">Parent / guardian & about you</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div><label className={label}>Parent / guardian name</label>{text("guardian")}</div>
            <div><label className={label}>Parent / guardian phone</label>{text("guardianPhone", "", "tel")}</div>
            <div className="md:col-span-2">
              <label className={label}>About me</label>
              <textarea value={form.bio} onChange={(e) => set("bio")(e.target.value)} rows={4}
                placeholder="Your interests, favourite subjects, what you want to learn…" className={input} />
            </div>
          </div>
        </div>

        <button type="button" onClick={save}
          className="flex items-center gap-2 rounded-xl bg-[#4A90E2] px-6 py-3 font-semibold text-white hover:bg-[#3B7FCB]">
          <Save size={18} /> Save profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
