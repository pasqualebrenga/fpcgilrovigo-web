"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type LoginFormProps = {
  redirectTo: string;
};

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Accesso non riuscito. Controlla email e password.");
      setIsSubmitting(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <form className="delegateLoginForm" onSubmit={handleSubmit}>
      <label>
        Email
        <span>
          <Mail size={17} />
          <input
            autoComplete="email"
            inputMode="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nome@dominio.it"
            required
            type="email"
            value={email}
          />
        </span>
      </label>
      <label>
        Password
        <span>
          <LockKeyhole size={17} />
          <input
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
            type="password"
            value={password}
          />
        </span>
      </label>
      {error ? <p className="delegateLoginError">{error}</p> : null}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Accesso in corso..." : "Entra nell'area delegati"}
      </button>
    </form>
  );
}
