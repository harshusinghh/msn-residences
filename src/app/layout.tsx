import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MSN Residences — Luxury Redefined',
  description:
    'Experience premium living at MSN Residences. An immersive 3D walkthrough of modern luxury apartments featuring world-class amenities, stunning architecture, and bespoke interiors.',
  keywords: ['luxury apartments', 'MSN Residences', 'premium living', 'real estate'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
