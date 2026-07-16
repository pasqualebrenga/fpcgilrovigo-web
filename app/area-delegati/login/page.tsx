import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login Area Delegati - FP CGIL Rovigo",
  description: "Accesso riservato all'area delegati FP CGIL Rovigo.",
  robots: {
    index: false,
    follow: false,
  },
};

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

function getSafeRedirect(next?: string) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/area-delegati/sanita";
  }

  return next;
}

export default async function DelegateLoginPage({ searchParams }: LoginPageProps) {
  const { error, next } = await searchParams;
  const redirectTo = getSafeRedirect(next);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(redirectTo);
  }

  return (
    <main className="delegateLoginPage">
      <section className="delegateLoginPanel">
        <div>
          <span className="delegateLoginBadge">
            <ShieldCheck size={16} /> Area riservata
          </span>
          <h1>Accesso delegati</h1>
          <p>
            Entra con email e password ricevute tramite invito. Accesso riservato ai delegati autorizzati da FP
            CGIL Rovigo.
          </p>
          {error ? (
            <p className="delegateLoginNotice">
              Il link non e valido o e scaduto. Richiedi un nuovo reset password da Supabase.
            </p>
          ) : null}
        </div>
        <LoginForm redirectTo={redirectTo} />
      </section>
    </main>
  );
}
