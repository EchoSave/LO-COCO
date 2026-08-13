import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to retrieve product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name: body.name,
        description: body.description,
        price: body.price,
        sizes: body.sizes,
        colors: body.colors,
        category: body.category,
        image: body.image,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("PUT PRODUCT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("PATCH PRODUCT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}