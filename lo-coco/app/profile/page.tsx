"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session)
    return <p className="text-red-600">You must be logged in to view this page.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold">Your Profile</h1>
      <p className="mt-2">Welcome, {session.user?.email}</p>
    </div>
  );
}
