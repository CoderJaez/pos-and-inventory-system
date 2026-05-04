import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "ok", service: "sari-sari-pos" }, { status: 200 });
}
