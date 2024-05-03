import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: {
    template: '%s | The Sticker Company',
    default: 'The Sticker Company', // a default is required when creating a template
  },
  description: 'Ponele onda a tus cosas con nuestros stickers. Arma tu pedido online, compra stickers, calcos y vinilos desde tu casa. Envios a todo Argentina.',
  generator: 'Supabase Vercel Next.js 14.1.1',
  applicationName: 'The Sticker Company Online Shop Tienda',
  // referrer: 'origin-when-cross-origin',
  keywords: [
    'Next.js',
    'React',
    'JavaScript',
    'Sticker',
    'Stickers',
    'Vinilo',
    'Vinilos',
    'Calco',
    'Calcos',
    'Calcomania',
    'Calcomanias',
    'Arg',
    'Argentina',
    'Comprar',
    'Online',
    'Tienda',
    'Shop',
    'Catalogo'
  ],
  authors: [
    { name: 'Sem Gabriel Roig', url: 'https://www.linkedin.com/in/sem-gabriel-roig/' },
    { name: 'Victoria Cabranes', url: 'https://www.linkedin.com/in/victoria-cabranes/' }
  ],
  creator: 'Sem Gabriel Roig',
  publisher: 'The Sticker Co Development Team',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  category: 'retail',
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