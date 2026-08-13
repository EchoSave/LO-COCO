'use client';
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function NavBar() {
  const { cart } = useCart();
  return (
    <header className="navbar">
      <Link href="/" className="logo">
        LO COCO
      </Link>

      <nav className="nav-links">
        <span>|</span>
        <Link href="/">Home</Link>
        <span>|</span>
        <Link href="/products">Shop</Link>
        <span>|</span>
        <Link href="/about">About</Link>
        <span>|</span>
      </nav>

      <div className="nav-actions">
        <Link href="/cart" className="relative">
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 py-1 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>

        <Link href="/profile" aria-label="Profile">
          ◯
        </Link>
      </div>
    </header>
  );
}
