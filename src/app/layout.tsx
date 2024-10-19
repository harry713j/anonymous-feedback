import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/AuthProvider";

const open = Open_Sans({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anonymous Feedback",
  description: "Get feedback anonymously",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={open.className}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
