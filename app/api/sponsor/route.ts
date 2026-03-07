import { NextResponse } from "next/server";

/**
 * POST /api/sponsor — sponsor inquiry (stub; wire to Resend/Stripe later)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validate body, send email via Resend, or create Stripe checkout session
    return NextResponse.json({ ok: true, message: "Inquiry received" });
  } catch (e) {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
