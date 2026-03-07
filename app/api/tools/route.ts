import { NextResponse } from "next/server";
import { getTools } from "@/lib/data";

/**
 * GET /api/tools — list tools (from Supabase or mock)
 */
export async function GET() {
  try {
    const tools = await getTools();
    return NextResponse.json(tools);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 });
  }
}
