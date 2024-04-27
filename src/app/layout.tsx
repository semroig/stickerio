import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'The Sticker Company',
  description: 'Ponele onda a tus cosas con nuestros stickers. Envios a todo Argentina y collecciones con ilustraciones únicas!',
}

import { Poppins } from 'next/font/google'
// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/toaster"

import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-neutral-100">
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}