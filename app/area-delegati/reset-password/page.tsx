import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ResetPasswordForm } from "./reset-password-form";

export const metadata: Metadata = {
  title: "Imposta Password - Area Delegati FP CGIL Rovigo",
  description: "Impostazione password per l'area delegati FP CGIL Rovigo.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/area-delegati/login?error=reset-session");
  }

  return (
    <main className="delegateLoginPage">
      <section className="delegateLoginPanel">
        <div>
          <span className="delegateLoginBadge">
            <ShieldCheck size={16} /> Password
          </span>
          <h1>Imposta password</h1>
          <p>Scegli una password per accedere alla tua area delegati FP CGIL Rovigo.</p>
        </div>
        <ResetPasswordForm />
      </section>
    </main>
  );
}
