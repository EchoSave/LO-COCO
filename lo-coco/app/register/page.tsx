"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Register</h1>

      <input
        className="border p-2 block mb-2"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

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
        Register
      </button>
    </div>
  );
}
