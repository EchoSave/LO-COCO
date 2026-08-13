"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <img
          src="/header.png"
          alt="Hero Image"
          className="hero-image"
        />
      </section>

      <section className="promotions">
        <div className="promo-card">
          <div className="promo-label">New<br />Arrivals</div>
          <img src="/promo1.png" alt="New arrivals" />
        </div>

        <div className="promo-card">
          <div className="promo-label">Trending</div>
          <img src="/promo2.png" alt="Trending styles" />
        </div>
      </section>

      <section className="best-sellers">
        <div className="section-heading">
          <span />
          <h1>Best Sellers</h1>
          <span />
        </div>

      </section>
    </main>
  );
}
