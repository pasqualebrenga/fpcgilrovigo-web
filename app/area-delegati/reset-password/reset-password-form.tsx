"use client";

import { FormEvent, useEffect, useState } from "react";
import { LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isPreparing, setIsPreparing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function recoverSessionFromHash() {
      const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";

      if (!hash) {
        setIsPreparing(false);
        return;
      }

      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (!accessToken || !refreshToken) {
        setIsPreparing(false);
        return;
      }

      const supabase = createClient();
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (sessionError) {
        setError("Il link non e piu valido. Richiedi una nuova email di recupero password.");
      } else {
        window.history.replaceState(null, "", window.location.pathname);
      }

      setIsPreparing(false);
    }

    recoverSessionFromHash();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Usa almeno 8 caratteri.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Le due password non coincidono.");
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setError("Non sono riuscito ad aggiornare la password. Apri di nuovo il link ricevuto via email.");
      setIsSubmitting(false);
      return;
    }

    router.push("/area-delegati/sanita");
    router.refresh();
  }

  return (
    <form className="delegateLoginForm" onSubmit={handleSubmit}>
      <label>
        Nuova password
        <span>
          <LockKeyhole size={17} />
          <input
            autoComplete="new-password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Almeno 8 caratteri"
            required
            type="password"
            value={password}
          />
        </span>
      </label>
      <label>
        Conferma password
        <span>
          <LockKeyhole size={17} />
          <input
            autoComplete="new-password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Ripeti la password"
            required
            type="password"
            value={confirmPassword}
          />
        </span>
      </label>
      {error ? <p className="delegateLoginError">{error}</p> : null}
      <button disabled={isPreparing || isSubmitting} type="submit">
        {isPreparing ? "Verifica link..." : isSubmitting ? "Aggiornamento..." : "Imposta password"}
      </button>
    </form>
  );
}
