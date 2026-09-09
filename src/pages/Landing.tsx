import { Link } from "react-router-dom";
import { PlaneTakeoff, BellRing, Radar, CalendarX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";
import { usePageMeta } from "@/lib/use-page-meta";

const features = [
  {
    icon: Radar,
    title: "盯緊熱門航線",
    subtitle: "Always-on route watching",
    body: "持續監控台北出發的熱門航線(東京、首爾),自動抓最低票價。",
  },
  {
    icon: BellRing,
    title: "達標自動通知",
    subtitle: "Target-price email alerts",
    body: "低於你設定的目標價,就寄 email 提醒你,附上立即訂購連結。",
  },
  {
    icon: CalendarX,
    title: "隨時取消",
    subtitle: "Cancel anytime",
    body: "月訂閱制,不想用隨時停,沒有綁約。",
  },
];

export default function Landing() {
  usePageMeta(
    "Flight Price Notifier — 機票降價通知",
    "設定台北出發的航線與目標價,機票降到目標價就寄 email 通知你。Set a route and a target price — we email you when the fare drops.",
  );
  const featureReveal = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <PlaneTakeoff className="size-4" />
            </span>
            <span className="text-sm font-semibold tracking-tight sm:text-base">
              Flight Price Notifier
            </span>
          </div>
          <Button asChild size="sm">
            <Link to="/auth">Sign in / 登入</Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="hero-glow relative overflow-hidden">
          <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
            <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.2em] text-primary">
              機票降價通知
            </p>
            <h1 className="animate-fade-up mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              Flight Price Notifier
            </h1>
            <p className="animate-fade-up mt-6 text-xl font-medium sm:text-2xl">
              設定航線與目標價,機票降價就通知你
            </p>
            <p className="animate-fade-up mt-3 text-base text-muted-foreground">
              Set a route and a target price — we email you when the fare drops.
            </p>
            <div className="animate-fade-up mt-9 flex justify-center">
              <Button asChild size="lg" className="glow-shadow">
                <Link to="/auth">Sign in / 登入</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-24">
          <div
            ref={featureReveal.ref}
            className={`grid gap-5 transition-all duration-700 sm:grid-cols-2 lg:grid-cols-3 ${
              featureReveal.visible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            {features.map(({ icon: Icon, title, subtitle, body }) => (
              <article
                key={title}
                className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-5 text-lg font-semibold">{title}</h2>
                <p className="mt-1 text-sm text-primary">{subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-muted-foreground">
          © 2026 Flight Price Notifier
        </div>
      </footer>
    </div>
  );
}
