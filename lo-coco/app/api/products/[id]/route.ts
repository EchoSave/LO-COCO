// // Single Product

// import { NextResponse } from "next/server";
// import Product from "@/models/Product";
// import { connectDB } from "@/lib/mongodb";

// export async function GET(req, { params }) {
//   await connectDB();
//   const product = await Product.findById(params.id);
//   return NextResponse.json(product);
// }


//Prototype for testing without a real database connection
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({
    id: params.id,
    name: "Mock Product",
    price: 29.99,
  });
}

