import { NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/**
 * POST /api/sponsor — sponsor inquiry. Sends email via Resend when configured.
 * Env: RESEND_API_KEY, SPONSOR_INQUIRY_EMAIL (to), optional SPONSOR_FROM_EMAIL (from; default onboarding@resend.dev for testing).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const tier = typeof body?.tier === "string" ? body.tier : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.SPONSOR_INQUIRY_EMAIL;
    const fromEmail = process.env.SPONSOR_FROM_EMAIL ?? "onboarding@resend.dev";

    if (apiKey && toEmail) {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        reply_to: email,
        subject: `Sponsor inquiry from ${name}${tier ? ` (${tier})` : ""}`,
        html: [
          `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`,
          tier ? `<p><strong>Interested in:</strong> ${escapeHtml(tier)}</p>` : "",
          `<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
        ].join(""),
      });
      if (error) {
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true, message: "Inquiry received" });
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
