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
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Products
      </h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}