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
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="product-page">
      <img
        src="/shop-header-photo.png"
        alt="Shop Header"
        className="w-full h-50 object-cover"
      />
      <h1 className="absolute left-100 top-40 flex items-center justify-center text-3xl font-bold text-white drop-shadow-lg">
        Elevate your style
      </h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-content">
          <h2 className="text-2xl font-semibold mb-5 mt-5 pt-5">Recently Added</h2>
          <div className="grid grid-cols-2 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}