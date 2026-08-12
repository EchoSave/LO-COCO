import Link from "next/link";

export default function NavBar() {
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
        <Link href="/cart" aria-label="Shopping cart">
          🛒
        </Link>

        <Link href="/profile" aria-label="Profile">
          ◯
        </Link>
      </div>
    </header>
  );
}