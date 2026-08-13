"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type User = {
  _id: string;
  email: string;
  name: string;
  role: "user" | "admin";
};

const emptyForm = {
  name: "",
  email: "",
  role: "user",
};

export default function AdminUsersPage() {
  const { data: session, status } = useSession();

  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Get users
  const getUsers = async () => {
    try {
      const res = await fetch("/api/users");

      if (!res.ok) {
        throw new Error("Failed to load users");
      }

      const data = await res.json();

      setUsers(data.users || data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      getUsers();
    }
  }, [status, session]);

  // Form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Create / update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);

    try {
      const url = editingId ? `/api/users/${editingId}` : "/api/users";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to save user");
      }

      setForm(emptyForm);
      setEditingId(null);

      await getUsers();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  // Edit
  const handleEdit = (user: User) => {
    setEditingId(user._id);

    setForm({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete
  const handleDelete = async (user: User) => {
    if (user._id === session?.user?.id) {
      alert("You cannot delete your own account.");
      return;
    }

    if (!confirm(`Delete ${user.name || user.email}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((current) => current.filter((item) => item._id !== user._id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete user.");
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  // Loading
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Login Required</h1>

        <Link
          href="/login"
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  // Not admin
  if (session.user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>

        <Link href="/" className="bg-black text-white px-5 py-3 rounded-lg">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCD5BB] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link
              href="/admin"
              className="text-sm text-gray-600 hover:text-black"
            >
              ← Admin Dashboard
            </Link>

            <h1 className="text-4xl font-bold mt-2">Users</h1>
          </div>

          <div className="bg-white px-4 py-2 rounded-lg shadow">
            {users.length} users
          </div>
        </div>

        {/* Add / Edit Form */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-5">
            {editingId ? "Edit User" : "Add User"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Name */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="border rounded-lg px-4 py-3"
              required
            />

            {/* Email */}
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border rounded-lg px-4 py-3"
              required
            />

            {/* Role */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 bg-white"
            >
              <option value="user">User</option>

              <option value="admin">Admin</option>
            </select>

            {/* Buttons */}
            <div className="md:col-span-3 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
              >
                {saving ? "Saving..." : editingId ? "Update User" : "Add User"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="border px-6 py-3 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold">All Users</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No users found.</div>
          ) : (
            <div className="divide-y">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* User info */}
                  <div>
                    <h3 className="font-bold text-lg">
                      {user.name || "Unnamed User"}
                    </h3>

                    <p className="text-gray-500">{user.email}</p>

                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="border px-4 py-2 rounded-lg hover:bg-gray-100"
                    >
                      Edit
                    </button>

                    {user._id !== session.user.id && (
                      <button
                        onClick={() => handleDelete(user)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
