import { NextResponse } from "next/server";
import { mockTools } from "@/lib/mock-data";

/**
 * GET /api/tools — list tools (for future Supabase swap)
 */
export async function GET() {
  try {
    return NextResponse.json(mockTools);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 });
  }
}
