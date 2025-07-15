// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/contexts/auth-context";
import { VotingProvider } from "@/contexts/voting-context";
import { Toaster } from "@/components/ui/sonner"; // use named import from re-export

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ITS Election 2025",
  description: "Secure online voting platform for student elections",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <VotingProvider>
            {children}
            <Toaster richColors position="top-right" />
          </VotingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
