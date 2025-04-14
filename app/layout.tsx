import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: {
    absolute: "Votify",
    template: "%s | Votify",
  },
  description:
    "Votify is a website for voting, creatting and sharing voting rooms that you can join and vote for your favorite options.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${process.env.NEXTAUTH_URL}`,
    description:
      "Votify is a website for voting, creatting and sharing voting rooms that you can join and vote for your favorite options.",
    siteName: "Votify",
    images: [
      {
        url: `${process.env.NEXTAUTH_URL}/assets/og.png`,
        width: 1200,
        height: 630,
        alt: "Votify",
      },
    ],
  },
  metadataBase: new URL(`${process.env.NEXTAUTH_URL}`),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  )
}
