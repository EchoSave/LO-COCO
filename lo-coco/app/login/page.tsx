"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/profile",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Login</h1>

      <input
        className="border p-2 block mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 block mb-2"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={submit}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Login
      </button>
    </div>
  );
}
