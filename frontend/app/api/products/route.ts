import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/server/db";
import Product from "@/lib/server/models/Product";

function csvFilter(searchParams: URLSearchParams, key: string) {
  const value = searchParams.get(key);
  return value ? { [key]: { $in: value.split(",") } } : {};
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const pageSize = Number(searchParams.get("pageSize")) || 20;
    const page = Number(searchParams.get("pageNumber")) || 1;
    const keyword = searchParams.get("keyword");
    const priceLte = searchParams.get("price_lte");
    const sort = searchParams.get("sort") || "-createdAt";

    const filter = {
      ...(keyword
        ? {
            name: {
              $regex: keyword,
              $options: "i",
            },
          }
        : {}),
      ...csvFilter(searchParams, "category"),
      ...csvFilter(searchParams, "gender"),
      ...csvFilter(searchParams, "range"),
      ...csvFilter(searchParams, "genre"),
      ...csvFilter(searchParams, "type"),
      ...csvFilter(searchParams, "season"),
      ...csvFilter(searchParams, "sillage"),
      ...csvFilter(searchParams, "lasting"),
      ...(priceLte ? { price: { $lte: Number(priceLte) } } : {}),
    };

    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .lean();

    return NextResponse.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch products";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const product = await Product.create({
      user: body.user || new mongoose.Types.ObjectId("000000000000000000000001"),
      name: body.name,
      price: body.price ?? 0,
      images: body.images ?? ["/images/sample.jpg"],
      category: body.category || "Sample category",
      gender: body.gender || "Unisex",
      fragranceType: body.fragranceType || "Sample type",
      stock: body.stock ?? 0,
      numReviews: body.numReviews ?? 0,
      rating: body.rating ?? 0,
      description: body.description || "Sample description",
      ingredients: body.ingredients,
      range: body.range,
      genre: body.genre,
      type: body.type,
      season: body.season,
      sillage: body.sillage,
      lasting: body.lasting,
      concentration: body.concentration,
      reviews: body.reviews ?? [],
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create product";
    return NextResponse.json({ message }, { status: 500 });
  }
}
