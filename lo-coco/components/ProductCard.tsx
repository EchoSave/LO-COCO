import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>

      <Link
        href={`/products/${product.id}`}
        className="mt-3 inline-block px-4 py-2 bg-black text-white rounded"
      >
        View Details
      </Link>
    </div>
  );
}
