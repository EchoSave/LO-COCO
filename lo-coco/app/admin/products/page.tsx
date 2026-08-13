"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  category: string;
  image: string;
};

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  sizes: "",
  colors: "",
  category: "",
  image: "",
};

export default function AdminProductsPage() {
  const { data: session, status } = useSession();

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Get products
  const getProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      setProducts(data.products || data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      getProducts();
    }
  }, [status, session]);

  // Form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Create or update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);

    const product = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      sizes: form.sizes
        .split(",")
        .map((size) => size.trim())
        .filter(Boolean),
      colors: form.colors
        .split(",")
        .map((color) => color.trim())
        .filter(Boolean),
      category: form.category,
      image: form.image,
    };

    try {
      const url = editingId ? `/api/products/${editingId}` : "/api/products";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        throw new Error("Failed to save product");
      }

      setForm(emptyProduct);
      setEditingId(null);

      await getProducts();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  // Edit
  const handleEdit = (product: Product) => {
    setEditingId(product._id);

    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price?.toString() || "",
      sizes: product.sizes?.join(", ") || "",
      colors: product.colors?.join(", ") || "",
      category: product.category || "",
      image: product.image || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((current) => current.filter((product) => product._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyProduct);
  };

  // Loading session
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

            <h1 className="text-4xl font-bold mt-2">Products</h1>
          </div>

          <div className="bg-white px-4 py-2 rounded-lg shadow">
            {products.length} products
          </div>
        </div>

        {/* Product Form */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-5">
            {editingId ? "Edit Product" : "Add Product"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product name"
              required
              className="w-full border rounded-lg px-4 py-3"
            />

            {/* Description */}
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows={3}
              className="w-full border rounded-lg px-4 py-3"
            />

            {/* Price + Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                required
                className="w-full border rounded-lg px-4 py-3"
              />

              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            {/* Sizes + Colors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="sizes"
                value={form.sizes}
                onChange={handleChange}
                placeholder="Sizes: S, M, L, XL"
                className="w-full border rounded-lg px-4 py-3"
              />

              <input
                name="colors"
                value={form.colors}
                onChange={handleChange}
                placeholder="Colors: Black, White, Red"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            {/* Image */}
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full border rounded-lg px-4 py-3"
            />

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Product"
                    : "Add Product"}
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

        {/* Products */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold">All Products</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No products yet.
            </div>
          ) : (
            <div className="divide-y">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Product info */}
                  <div className="flex items-center gap-4">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                        No image
                      </div>
                    )}

                    <div>
                      <h3 className="font-bold text-lg">{product.name}</h3>

                      <p className="text-gray-500">
                        {product.category || "No category"}
                      </p>

                      <p className="font-semibold mt-1">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="border px-4 py-2 rounded-lg hover:bg-gray-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
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
