// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Challenge",
  description: "CRUD de alta de personal - Challenge ingreso",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-white shadow sticky top-0 z-10">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="font-bold text-lg text-blue-600">CRUD</h1>
            <div className="flex gap-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Inicio
              </Link>
              <Link
                href="/empleados"
                className="text-gray-700 hover:text-blue-600"
              >
                Empleados
              </Link>
              <Link href="/areas" className="text-gray-700 hover:text-blue-600">
                Áreas
              </Link>      
            </div>
          </nav>
        </header>

        <main className="max-w-6xl mx-auto p-6">{children}</main>

        <footer className="text-center text-sm text-gray-500 mt-20 mb-4">
          Desarrollado para el Challenge de Ingreso 2025 - Gobierno CABA
        </footer>
      </body>
    </html>
  );
}
