import './globals.css';
import { Inter } from 'next/font/google';
import { TooltipProvider } from '@/components/ui/tooltip';
import Navbar from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex min-h-dvh flex-col">
        <TooltipProvider>
          <Navbar />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
