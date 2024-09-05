export default async function VotingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      {/*SideBar */}
      {children}
    </main>
  )
}
