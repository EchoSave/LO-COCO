"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain rounded"
      />

      <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>

      <Link
        href={`/products/${product.id}`}
        className="mt-3 mr-3 inline-block px-1 py-1 hover:bg-black hover:text-white rounded"
      >
        View Details
      </Link>

      <button className="mt-3 ml-3 inline-block px-1 py-1 hover:bg-black hover:text-white rounded"
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1,
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}
