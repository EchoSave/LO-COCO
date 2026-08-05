import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <Link href="/" className="text-xl font-bold">LO COCO</Link>

      <div className="flex gap-4">
        <Link href="/products">Products</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/profile">Profile</Link>
      </div>
    </nav>
  );
}
