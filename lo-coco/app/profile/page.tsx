"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cocoTan">
        <p className="text-xl mb-4">You must be logged in to view your profile.</p>
        <Link
          href="/login"
          className="px-6 py-3 bg-black text-white rounded hover:opacity-80 transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cocoTan">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-playfair text-center mb-6">Your Profile</h1>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="text-lg font-medium">{session.user?.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-lg font-medium">{session.user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full mt-8 bg-black text-white py-3 rounded hover:opacity-80 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
