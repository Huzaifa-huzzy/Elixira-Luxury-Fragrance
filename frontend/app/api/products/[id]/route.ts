import { NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import Product from "@/lib/server/models/Product";

interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    await connectDB();

    const product = await Product.findById(params.id).lean();

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch product";
    return NextResponse.json({ message }, { status: 500 });
  }
}
