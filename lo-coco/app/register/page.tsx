"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

const submit = async () => {
  const res = await fetch("/api/users/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });

  let data;

  try {
    data = await res.json();
  } catch {
    setMessage("Unexpected server response");
    return;
  }

  if (data.error) {
    setMessage(data.error);
    return;
  }

  window.location.href = "/login";
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-cocoTan">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-playfair text-center mb-6">Register</h1>

        {message && <p className="text-center mb-4 text-cocoDark">{message}</p>}

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

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
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
