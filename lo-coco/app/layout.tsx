'use client';

import "./globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { SessionContext, SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body className="bg-gray-50 text-gray-900">
        <SessionProvider>
          <CartProvider>
            <Navbar />
            <main className="">{children}</main>
            <Footer />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
