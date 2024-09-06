import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"

import { ServerSession } from "@/lib/session"
import { emailToName } from "@/lib/utils"

import VotingProfileOptions from "@/components/layout/voting-profile-options"
import { Icons } from "@/components/shared/icons"
import VotingRoomsOptions from "@/components/layout/voting-rooms-options"

export default async function VotingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await ServerSession()

  return (
    <main className="flex h-screen">
      <div className="fixed h-full w-[280px] flex-shrink-0 border-r bg-gray-100 pb-4 shadow-lg">
        <div className="flex flex-col">
          <div className="flex h-[60px] items-center px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src="/assets/logo.png"
                alt="Votify"
                width={215}
                height={187}
                className="size-6"
              />

              <span className="text-lg">Votify</span>
            </Link>
          </div>
          <div className="-mt-2 px-4">
            <Separator className="my-2 bg-black/20" />
          </div>
        </div>
        <div className="flex h-[calc(100%-60px)] flex-col justify-between overflow-y-auto py-2">
          <div className="flex flex-col justify-between px-4 text-sm font-medium">
            <Link
              href="/votingRooms"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:bg-muted"
            >
              <Icons.votingRoom className="size-5" />
              Voting Rooms
            </Link>
            <Link
              href={"/"}
              className="rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
            >
              Voting Room 1
            </Link>
            <Link
              href={"/"}
              className="rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
            >
              Voting Room 2
            </Link>
            <Link
              href={"/"}
              className="rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
            >
              Voting Room 3
            </Link>
          </div>
          <div className="flex flex-col gap-2 px-4">
            <div className="flex flex-col gap-2">
              <Separator className="my-2 bg-black/20" />
              <VotingRoomsOptions />
            </div>
            <Separator className="my-2 bg-black/20" />
            <VotingProfileOptions
              image={session?.user?.image || ""}
              name={session?.user?.name || emailToName(session?.user?.email!)}
            />
          </div>
        </div>
      </div>
      <div className="ml-[280px] flex-1 overflow-auto">{children}</div>
    </main>
  )
}
