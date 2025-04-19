import type { Metadata } from "next";
import { Fredoka, Poppins, Quicksand } from "next/font/google";
import "./globals.css";
import "../styles/background.css";
import "../styles/transitions.css";
import "../styles/cursor.css";
import CustomCursor from "@/components/CustomCursor";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Writealo - Crea ebooks con IA",
  description: "Crea ebooks únicos y creativos con la ayuda de la IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fredoka.variable} ${poppins.variable} ${quicksand.variable}`}>
      <body className="cursor-none">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
