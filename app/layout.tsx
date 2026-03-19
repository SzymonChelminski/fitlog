import "./globals.css"
import { Inter } from "next/font/google"
import { TooltipProvider } from "@/components/ui/tooltip"

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <TooltipProvider>
            {children}
        </TooltipProvider>
       </body>
    </html>
  )
}