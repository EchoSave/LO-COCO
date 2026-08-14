"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order: any) => (
          <div key={order._id} className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold">Order #{order._id}</h2>
            <p className="text-gray-600">Customer: {order.userId}</p>
            <p className="text-gray-600">Items: {order.items?.length ?? 0}</p>
            <p className="text-gray-600">Total: ${order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}</p>
            <p className="text-gray-600">Status: {order.status}</p>
            <p className="text-gray-600">Created At: {order.createdAt ? order.createdAt.toLocaleString() : ""}</p>
            <Link
              href={`/admin/orders/${order._id}`}
              className="mt-2 inline-block text-blue-500 hover:underline"
            >
              View Details
            </Link>
            <button
              onClick={async () => {
                await fetch("/api/orders", {
                  method: "DELETE",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify({ id: order._id })
                });
                setOrders(orders.filter((o: any) => o._id !== order._id));
              }}
              className="mt-2 ml-2 px-4 py-2 bg-red-600 text-white rounded hover:opacity-80"
            >
              Delete Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}