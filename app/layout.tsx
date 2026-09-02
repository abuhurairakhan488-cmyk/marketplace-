import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EquipWorld — Heavy Equipment Marketplace',
  description: 'Buy and sell heavy equipment worldwide.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        <header className="border-b border-neutral-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <a href="/" className="text-lg font-semibold">EquipWorld</a>
            <nav className="flex items-center gap-6 text-sm">
              <a href="/browse" className="hover:underline">Browse</a>
              <a href="/sell" className="hover:underline">Sell Equipment</a>
              <a href="/messages" className="hover:underline">Messages</a>
              <a href="/dashboard" className="hover:underline">Dashboard</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}