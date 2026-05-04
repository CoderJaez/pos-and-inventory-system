import { NextResponse } from "next/server";
import { z } from "zod";
import { adjustInventory } from "@/lib/server/product-actions";

const stockAdjustSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number(),
  reason: z.string().min(2),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = stockAdjustSchema.parse(json);
    const data = await adjustInventory(parsed.productId, parsed.quantity, parsed.reason);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Stock adjustment failed", error }, { status: 400 });
  }
}
