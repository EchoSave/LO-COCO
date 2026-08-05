import ProductCard from "@/components/ProductCard";

const mockProducts = [
  { id: 1, name: "Black Hoodie", price: 49.99, image: "/images/hoodie.jpg" },
  { id: 2, name: "White Tee", price: 19.99, image: "/images/tshirt.jpg" },
];

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Products</h1>

      <div className="grid grid-cols-2 gap-6">
        {mockProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
