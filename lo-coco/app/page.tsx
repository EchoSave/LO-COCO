import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">LO COCO Prototype</h1>
      <p className="mb-6">Welcome! Click around to explore the prototype.</p>

      <div className="flex gap-4">
        <Link href="/products" className="px-4 py-2 bg-black text-white rounded">
          View Products
        </Link>

        <Link href="/cart" className="px-4 py-2 bg-gray-800 text-white rounded">
          View Cart
        </Link>

        <Link href="/profile" className="px-4 py-2 bg-gray-600 text-white rounded">
          Profile
        </Link>
      </div>
    </div>
  );
}
