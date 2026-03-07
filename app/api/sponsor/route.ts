import { NextResponse } from "next/server";

/**
 * POST /api/sponsor — sponsor inquiry. Accepts name, email, tier, message.
 * Wire to Resend (or another provider) to send an email to your inbox.
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

    // TODO: send email via Resend or your provider, e.g.:
    // await resend.emails.send({ from: "...", to: "you@domain.com", subject: `Sponsor: ${name}`, html: `...` });
    return NextResponse.json({ ok: true, message: "Inquiry received" });
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
