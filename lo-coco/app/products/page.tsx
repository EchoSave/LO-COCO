"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const formattedProducts = data.map((product: any) => ({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error(error);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <img
          src="/shop-header-photo.png"
          alt="Shop Header"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        <h1 className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Elevate your style
        </h1>
      </div>

      {/* Products */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found.
          </p>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-semibold">
                  Recently Added
                </h2>
                <p className="text-gray-500 mt-1">
                  Discover our latest styles
                </p>
              </div>

              <p className="text-sm text-gray-500">
                {products.length} products
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}