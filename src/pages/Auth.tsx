import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlaneTakeoff } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { usePageMeta } from "@/lib/use-page-meta";

type AuthTab = "signin" | "signup";

export default function Auth({ defaultTab = "signin" }: { defaultTab?: AuthTab }) {
  usePageMeta(
    "Sign in / 登入 — Flight Price Notifier",
    "登入或註冊 Flight Price Notifier,開始追蹤台北出發的機票價格。",
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/app", { replace: true });
    });
  }, [navigate]);

  async function handleSubmit(mode: AuthTab, e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin },
          });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      navigate("/app", { replace: true });
    } else {
      toast.success("請到 email 收信完成註冊確認。");
    }
  }

  return (
    <div className="hero-glow flex min-h-screen flex-col bg-background text-foreground">
      <header className="mx-auto w-full max-w-6xl px-5 py-6">
        <Link to="/" className="inline-flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <PlaneTakeoff className="size-4" />
          </span>
          <span className="text-sm font-semibold">Flight Price Notifier</span>
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 pb-16">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-8">
          <Tabs defaultValue={defaultTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign in / 登入</TabsTrigger>
              <TabsTrigger value="signup">Sign up / 註冊</TabsTrigger>
            </TabsList>

            {(["signin", "signup"] as const).map((mode) => (
              <TabsContent key={mode} value={mode} className="mt-6">
                <form
                  className="space-y-4"
                  onSubmit={(e) => handleSubmit(mode, e)}
                >
                  <div className="space-y-2">
                    <Label htmlFor={`${mode}-email`}>Email</Label>
                    <Input
                      id={`${mode}-email`}
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${mode}-password`}>Password / 密碼</Label>
                    <Input
                      id={`${mode}-password`}
                      type="password"
                      autoComplete={
                        mode === "signin" ? "current-password" : "new-password"
                      }
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {mode === "signin" ? "Sign in / 登入" : "Sign up / 註冊"}
                  </Button>
                </form>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}
