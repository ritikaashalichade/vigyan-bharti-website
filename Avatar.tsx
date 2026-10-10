import { initials, type User } from "../lib/store";

// Round profile picture; shows the uploaded photo, or the initials when there is none.
export default function Avatar({ user, size = 40, className = "" }: { user: Pick<User, "first" | "last" | "photo">; size?: number; className?: string }) {
  const style = { width: size, height: size, fontSize: Math.max(12, size * 0.38) };
  return user.photo ? (
    <img src={user.photo} alt="" style={style} className={`shrink-0 rounded-full object-cover ${className}`} />
  ) : (
    <div style={style} className={`flex shrink-0 items-center justify-center rounded-full bg-[#DCEEFF] font-semibold text-[#4A90E2] ${className}`}>
      {initials(user)}
    </div>
  );
}
