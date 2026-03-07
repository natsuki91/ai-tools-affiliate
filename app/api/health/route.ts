import { NextResponse } from "next/server";

/**
 * GET /api/health — plain text response to check if the app is running.
 * Use this on Hostinger to confirm the Node app started (e.g. https://toolscout.tools/api/health).
 */
export async function GET() {
  return new NextResponse("OK", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}
