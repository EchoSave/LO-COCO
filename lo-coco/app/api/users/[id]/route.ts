import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const body = await request.json();

  const { name, email, password, role } = body;

  const updateData: any = {
    name,
    email: email?.toLowerCase(),
    role,
  };

  // Only change password if one was provided
  if (password) {
    updateData.password = await bcrypt.hash(password, 12);
  }

  const user = await User.findByIdAndUpdate(
    params.id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const user = await User.findByIdAndDelete(params.id);

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: "User deleted successfully",
  });
}
