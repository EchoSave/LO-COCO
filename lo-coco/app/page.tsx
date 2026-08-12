
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <img
          src="/hero.jpg"
          alt="Hero Image"
          className="hero-image"
        />
      </section>

      <section className="promotions">
        <div className="promo-card">
          <div className="promo-label">New<br />Arrivals</div>
          <img src="/promos/new-arrivals.jpg" alt="New arrivals" />
        </div>

        <div className="promo-card">
          <div className="promo-label">Trending</div>
          <img src="/promos/trending.jpg" alt="Trending styles" />
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
