"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminPage() {
  const { data: session, status } = useSession();

  // Loading
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Not logged in
  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">
          Login Required
        </h1>

        <p className="mb-6">
          You must be logged in to access the admin dashboard.
        </p>

        <Link
          href="/login"
          className="px-6 py-3 bg-black text-white rounded"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  // Logged in but not admin
  if (session.user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">
          Access Denied
        </h1>

        <p className="text-gray-600 mb-6">
          You do not have permission to access the admin dashboard.
        </p>

        <Link
          href="/"
          className="px-6 py-3 bg-black text-white rounded"
        >
          Return Home
        </Link>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-[#f7e5d4] p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome back, {session.user.name}.
          </p>
        </div>

        <div className="bg-white px-4 py-2 rounded-lg shadow">
          <span className="font-semibold">
            Administrator
          </span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-gray-500">
            Products
          </p>

          <p className="text-3xl font-bold mt-2">
            —
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Products in database
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-gray-500">
            Users
          </p>

          <p className="text-3xl font-bold mt-2">
            —
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Registered users
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-gray-500">
            Orders
          </p>

          <p className="text-3xl font-bold mt-2">
            —
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Customer orders
          </p>
        </div>

      </div>

      {/* Admin Actions */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Administration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <Link
            href="/admin/products"
            className="border rounded-lg p-5 hover:bg-gray-50 transition"
          >
            <h3 className="font-bold text-lg">
              Manage Products
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Add, edit, and delete products.
            </p>
          </Link>

          <Link
            href="/admin/users"
            className="border rounded-lg p-5 hover:bg-gray-50 transition"
          >
            <h3 className="font-bold text-lg">
              Manage Users
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              View registered users and their roles.
            </p>
          </Link>

          <Link
            href="/admin/orders"
            className="border rounded-lg p-5 hover:bg-gray-50 transition"
          >
            <h3 className="font-bold text-lg">
              Manage Orders
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              View and manage customer orders.
            </p>
          </Link>

        </div>
      </div>

    </div>
  );
}