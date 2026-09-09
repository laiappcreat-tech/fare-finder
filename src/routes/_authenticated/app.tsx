import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { PlaneTakeoff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Dashboard — Flight Price Notifier" },
      {
        name: "description",
        content: "你的航線追蹤儀表板 — Flight Price Notifier.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AppShell,
});

function AppShell() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    router.invalidate();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <PlaneTakeoff className="size-4" />
            </span>
            <span className="text-sm font-semibold">Flight Price Notifier</span>
          </div>
          <Button variant="secondary" size="sm" onClick={handleSignOut}>
            Sign out / 登出
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-16">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Hi {user.email}
        </h1>
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="text-base">
            你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Your dashboard is coming soon. Route-subscription will be added in the
            next milestone.
          </p>
        </div>
      </main>
    </div>
  );
}
