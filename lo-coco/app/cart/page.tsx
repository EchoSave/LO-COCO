"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, totalPrice } = useCart();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cocoTan">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h1 className="text-3xl font-playfair mb-4">Order Complete</h1>
          <p className="text-lg">Thank you for your purchase!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cocoTan p-8">
      <h1 className="text-3xl font-playfair mb-6">Your Cart</h1>

      {cart.length === 0 && (
        <p className="text-lg">Your cart is empty.</p>
      )}

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-playfair text-lg">{item.name}</h2>
              <p>${item.price} × {item.qty}</p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:opacity-80"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <>
          <div className="mt-6 text-xl font-medium">
            Total: ${totalPrice.toFixed(2)}
          </div>

          {!showAddressForm && (
            <button
              onClick={() => setShowAddressForm(true)}
              className="mt-4 px-6 py-3 bg-black text-white rounded hover:opacity-80"
            >
              Order
            </button>
          )}
        </>
      )}

      {showAddressForm && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow max-w-md">
          <h2 className="text-2xl font-playfair mb-4">Shipping Address</h2>

          <textarea
            className="w-full border p-3 rounded mb-4"
            rows={4}
            placeholder="Enter your shipping address"
            onChange={(e) => setAddress(e.target.value)}
          />

          <button
            onClick={async () => {
              if (!address.trim()) return;
              
              const orderData = {
                userId: "Guest",
                items: cart.map(item => ({
                  productId: item.id,
                  quantity: item.qty,
                  price: item.price
                })),
                totalAmount: totalPrice,
                status: "Pending",
                createdAt: new Date()
              };

              await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
              });

              setOrderComplete(true);
            }}
            className="w-full bg-black text-white py-3 rounded hover:opacity-80"
          >
            Submit Order
          </button>
        </div>
      )}
    </div>
  );
}
