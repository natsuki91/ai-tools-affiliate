import { NextResponse } from "next/server";
import { Resend } from "resend";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  if (now >= entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  if (entry.count >= RATE_LIMIT_MAX) return { allowed: false };
  entry.count += 1;
  return { allowed: true };
}

/**
 * POST /api/sponsor — sponsor inquiry. Sends email via Resend + auto-reply.
 * Env: RESEND_API_KEY, SPONSOR_EMAIL (or SPONSOR_INQUIRY_EMAIL), SPONSOR_FROM_EMAIL (optional).
 * Rate limit: 5 submissions per IP per hour.
 */
export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const toolName = typeof body?.toolName === "string" ? body.toolName.trim() : "";
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const website = typeof body?.website === "string" ? body.website.trim() : "";
    const niche = typeof body?.niche === "string" ? body.niche.trim() : "";
    const packageChoice = typeof body?.package === "string" ? body.package.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const howDidYouHear = typeof body?.howDidYouHear === "string" ? body.howDidYouHear.trim() : "";

    if (!toolName || !name || !email || !message) {
      return NextResponse.json(
        { error: "Tool name, your name, email, and message are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const toEmail = process.env.SPONSOR_EMAIL ?? process.env.SPONSOR_INQUIRY_EMAIL;
    const fromEmail = process.env.SPONSOR_FROM_EMAIL ?? "onboarding@resend.dev";
    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey && toEmail) {
      const resend = new Resend(apiKey);
      const subject = `New Sponsor Inquiry — ${escapeHtml(toolName)} — ${packageChoice || "Not specified"}`;
      const htmlBody = [
        `<p><strong>Tool/Company:</strong> ${escapeHtml(toolName)}</p>`,
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
        `<p><strong>Website:</strong> ${escapeHtml(website) || "—"}</p>`,
        `<p><strong>Niche:</strong> ${escapeHtml(niche) || "—"}</p>`,
        `<p><strong>Package:</strong> ${escapeHtml(packageChoice) || "—"}</p>`,
        `<p><strong>How did they hear about us:</strong> ${escapeHtml(howDidYouHear) || "—"}</p>`,
        `<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
      ].join("");

      const { error: err1 } = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        reply_to: email,
        subject,
        html: htmlBody,
      });
      if (err1) {
        return NextResponse.json({ error: "Failed to send inquiry." }, { status: 500 });
      }

      const autoReplySubject = "We received your ToolScout sponsorship inquiry!";
      const autoReplyBody = `Hi ${escapeHtml(name)},

Thanks for reaching out about sponsoring ${escapeHtml(toolName)} on ToolScout.tools. We'll review your inquiry and get back to you within 24 hours with next steps.

In the meantime, feel free to reply to this email with any questions.

— The ToolScout Team`;

      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: autoReplySubject,
        text: autoReplyBody,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to submit. Please try again or email us directly." }, { status: 500 });
  }
}
