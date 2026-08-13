"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    window.location.href = "/profile";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cocoTan">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-playfair text-center mb-6">Login</h1>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded mb-6"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-black text-white py-3 rounded hover:opacity-80 transition"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link href="/register" className="underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
