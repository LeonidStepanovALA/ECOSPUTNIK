import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Эко Туризм",
  description: "Платформа для устойчивого туризма",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="font-sans bg-green-50">{children}</body>
    </html>
  );
}
