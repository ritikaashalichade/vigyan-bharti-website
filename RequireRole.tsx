import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser, homePathFor, roleOf, useStore, type Role } from "../lib/store";

// Wraps a group of routes: not logged in -> login page; wrong role -> that person's own home page.
export default function RequireRole({ role }: { role: Role }) {
  useStore();
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  if (roleOf(user) !== role) return <Navigate to={homePathFor(roleOf(user))} replace />;
  return <Outlet />;
}
