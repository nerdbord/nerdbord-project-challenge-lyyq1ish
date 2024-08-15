import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { plPL } from '@clerk/localizations'

const lato = Lato({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PARAGONE',
  description:
    'Aplikacja do zarządzania wydatkami poprzez skanowanie paragonów.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={plPL}>
      <html lang="pl" data-theme="light" className="bg-[#312d2d]">
        <body
          className={`${lato.className} relative mx-auto min-h-screen max-w-[393px] bg-[#F6F5FA] text-[#383838]`}
        >
          <main className="">
            <div className="">{children}</div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
