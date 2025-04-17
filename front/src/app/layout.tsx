import type { Metadata } from "next";
import { Fredoka, Poppins, Quicksand } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fredoka",
});

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const quicksand = Quicksand({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Writealo - Create Ebooks with AI",
  description: "Create unique and imaginative ebooks with ease using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${poppins.variable} ${quicksand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
