import { NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/**
 * POST /api/newsletter — newsletter signup. Sends subscriber email to owner via Resend when configured.
 * Env: RESEND_API_KEY, SPONSOR_INQUIRY_EMAIL or NEWSLETTER_NOTIFY_EMAIL (to).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const source = typeof body?.source === "string" ? body.source : "homepage_inline";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.NEWSLETTER_NOTIFY_EMAIL ?? process.env.SPONSOR_INQUIRY_EMAIL;
    const fromEmail = process.env.SPONSOR_FROM_EMAIL ?? "onboarding@resend.dev";

    if (apiKey && toEmail) {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `Newsletter signup: ${email}`,
        html: `<p><strong>New subscriber:</strong> ${escapeHtml(email)}</p><p><strong>Source:</strong> ${escapeHtml(source)}</p>`,
      });
      if (error) {
        return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true, message: "Thanks for subscribing!" });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
