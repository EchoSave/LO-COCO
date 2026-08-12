import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  await connectDB();
  const { email, password, name } = await req.json();

  const exists = await User.findOne({ email });
  if (exists) return NextResponse.json({ error: "User exists" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);

  await User.create({ email, password: hashed, name });

  return NextResponse.json({ message: "Registered" });
}
