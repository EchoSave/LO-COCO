// import { NextResponse } from "next/server";
// import Product from "@/models/Product";
// import { connectDB } from "@/lib/mongodb";

// export async function GET() {
//   await connectDB();
//   const products = await Product.find({});
//   return NextResponse.json(products);
// }


//Prototype for testing without a real database connection
import { NextResponse } from "next/server";

export async function GET():Promise<Response> {
  return NextResponse.json([
    { id: 1, name: "Black Hoodie", price: 49.99 },
    { id: 2, name: "White Tee", price: 19.99 },
  ]);
}
