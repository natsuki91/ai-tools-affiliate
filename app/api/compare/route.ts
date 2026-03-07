import { NextResponse } from "next/server";
import { getComparisons } from "@/lib/data";

/**
 * GET /api/compare — list comparisons (from Supabase or mock)
 */
export async function GET() {
  try {
    const comparisons = await getComparisons();
    return NextResponse.json(comparisons);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch comparisons" }, { status: 500 });
  }
}
