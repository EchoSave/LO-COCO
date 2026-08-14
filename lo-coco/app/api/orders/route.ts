import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json(orders);
  }
  catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const order = await Order.create(body);
    return NextResponse.json(order);
  }
  catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { id } = await request.json();
    await Order.findByIdAndDelete(id);
    return NextResponse.json({ message: "Order deleted successfully" });
  }
  catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
