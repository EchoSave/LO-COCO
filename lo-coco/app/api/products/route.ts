import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  await connectDB();
  const products = await Product.find({});
  return NextResponse.json(products);
}
