
export default function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold">Product #{params.id}</h1>
      <p className="mt-2">This is a placeholder product page.</p>

      <button className="mt-4 px-4 py-2 bg-black text-white rounded">
        Add to Cart
      </button>
    </div>
  );
}
