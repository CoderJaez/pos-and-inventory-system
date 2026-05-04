import { NextResponse } from "next/server";
import { z } from "zod";
import { getDailySummary } from "@/lib/server/reports/summary";

const schema = z.object({ date: z.string().optional() });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = schema.parse({ date: searchParams.get("date") ?? undefined });
  const date = parsed.date ?? new Date().toISOString().slice(0, 10);
  const report = await getDailySummary(date);
  return NextResponse.json(report);
}
