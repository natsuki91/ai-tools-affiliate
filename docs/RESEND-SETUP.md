# Sponsor form email (Resend)

The sponsor contact form can send inquiries to your inbox via [Resend](https://resend.com).

## 1. Get an API key

1. Sign up at [resend.com](https://resend.com).
2. In the dashboard, create an **API Key**.
3. Copy the key (starts with `re_`).

## 2. Set env vars

**Local (`.env.local`):**
```
RESEND_API_KEY=re_xxxxxxxxxxxx
SPONSOR_INQUIRY_EMAIL=you@yourdomain.com
```

**Hostinger:** Add the same vars in the Node.js app → Environment variables.

Optional:
- `SPONSOR_FROM_EMAIL` — Sender address. If omitted, Resend uses `onboarding@resend.dev` (for testing). For production, use an address on a [verified domain](https://resend.com/docs/dashboard/domains/introduction) (e.g. `notifications@yourdomain.com`).

## 3. Verify your domain (production)

To send from your own address (e.g. `notifications@yourdomain.com`):

1. In Resend → **Domains** → **Add domain**.
2. Add the DNS records they show (SPF, DKIM, etc.) at your domain provider.
3. Set `SPONSOR_FROM_EMAIL=notifications@yourdomain.com`.

Until then, `onboarding@resend.dev` works for testing; some providers may treat it as less trusted.

## 4. Test

Submit the form on `/sponsor`. You should receive an email at `SPONSOR_INQUIRY_EMAIL` with the sender’s name, email, tier, and message. Replying goes to the sender’s email (reply_to).

If the vars are not set, the form still returns “Thanks!” but no email is sent.
