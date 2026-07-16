import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function getSafeRedirect(origin: string, next: string | null) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return `${origin}/area-delegati/reset-password`;
  }

  return `${origin}${next}`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const next = url.searchParams.get("next");
  const redirectTo = getSafeRedirect(url.origin, next);
  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(`${url.origin}/area-delegati/login?error=invalid-link`);
    }

    return NextResponse.redirect(redirectTo);
  }

  if (!tokenHash || !type) {
    return NextResponse.redirect(`${url.origin}/area-delegati/login?error=invalid-link`);
  }

  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type,
  });

  if (error) {
    return NextResponse.redirect(`${url.origin}/area-delegati/login?error=invalid-link`);
  }

  return NextResponse.redirect(redirectTo);
}
