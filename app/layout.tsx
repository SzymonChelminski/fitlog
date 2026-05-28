import './globals.css';
import { Inter, Orbitron } from 'next/font/google';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/ThemeProvider';
import { EmotionRegistry } from '@/components/EmotionRegistry';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-orbitron',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.className} ${orbitron.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <EmotionRegistry>
            <TooltipProvider>
              <Navbar />
              <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
                {children}
              </div>
              <Footer />
            </TooltipProvider>
          </EmotionRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
