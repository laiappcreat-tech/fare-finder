import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";

const UserContext = createContext<User | null>(null);

// Replaces TanStack's `Route.useRouteContext().user` — read the authenticated
// user inside any route rendered under <ProtectedRoute />.
export function useAuthUser(): User {
  const user = useContext(UserContext);
  if (!user) throw new Error("useAuthUser must be used within a ProtectedRoute");
  return user;
}

type AuthState =
  | { status: "loading" }
  | { status: "authed"; user: User }
  | { status: "unauthed" };

export function ProtectedRoute() {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      if (error || !data.user) setState({ status: "unauthed" });
      else setState({ status: "authed", user: data.user });
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      if (session?.user) setState({ status: "authed", user: session.user });
      else setState({ status: "unauthed" });
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (state.status === "loading") {
    return <div className="min-h-screen bg-background" />;
  }
  if (state.status === "unauthed") {
    return <Navigate to="/auth" replace />;
  }
  return (
    <UserContext.Provider value={state.user}>
      <Outlet />
    </UserContext.Provider>
  );
}
