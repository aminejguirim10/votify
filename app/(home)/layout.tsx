import HomeNavbar from "@/components/layout/home-navbar"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <HomeNavbar />
      {children}
    </main>
  )
}
