import { NextResponse } from "next/server";
import { mockComparisons } from "@/lib/mock-data";

/**
 * GET /api/compare — list comparisons (for future Supabase swap)
 */
export async function GET() {
  try {
    return NextResponse.json(mockComparisons);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch comparisons" }, { status: 500 });
  }
}
