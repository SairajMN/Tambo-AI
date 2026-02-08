import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TamboProvider } from "@/components/TamboProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agentic Product Composer",
  description: "Conversational App Builder with Tambo AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TamboProvider>
          <div className="min-h-screen bg-background">{children}</div>
        </TamboProvider>
      </body>
    </html>
  );
}
