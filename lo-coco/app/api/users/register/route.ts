import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { error: "User exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const role = email === "admin@lococo.com" ? "admin" : "user";

    await User.create({ email, password: hashed, name, role });

    return NextResponse.json({ message: "Registered" }, { status: 200 });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
