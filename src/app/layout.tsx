import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Git-Sol",
    absolute: "Git-Sol",
  },
  description:
    "Earn Sol by contributing to projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider>
        <>
        <AppBar />
        {children}
        <Toaster />
        <Footer />
      </>
      </SessionProvider>
      </body>
    </html>
  );
}
