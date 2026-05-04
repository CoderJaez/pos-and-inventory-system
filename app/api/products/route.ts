import { NextResponse } from "next/server";
import { productSchema } from "@/lib/validations/product.schema";
import { createProduct, listProducts } from "@/lib/server/product-actions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || undefined;
  const data = await listProducts(search);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = productSchema.parse(json);
    const product = await createProduct(parsed);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid product payload", error }, { status: 400 });
  }
}
