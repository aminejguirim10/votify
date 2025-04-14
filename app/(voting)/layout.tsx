import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"

import { ServerSession } from "@/lib/session"
import { emailToName } from "@/lib/utils"

import VotingProfileOptions from "@/components/layout/voting-profile-options"
import { Icons } from "@/components/shared/icons"
import VotingRoomsOptions from "@/components/layout/voting-rooms-options"
import { getVotingRooms } from "@/actions/voting-room.actions"
import { VotingRoomFetched } from "@/types"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { redirect } from "next/navigation"
import { getUser } from "@/actions/user.actions"
import { User } from "@prisma/client"

export default async function VotingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await ServerSession()
  if (!session) {
    redirect("/signin")
  }

  const user = (await getUser()) as User

  const votingRooms = (await getVotingRooms(
    session?.user.id!
  )) as VotingRoomFetched[]

  return (
    <main className="flex h-screen">
      <Sheet>
        <SheetTrigger className="mt-6 block self-start p-2 md:hidden">
          <div className="rounded-full p-2 transition-colors hover:bg-[#335766]/20">
            <Icons.sidePanel className="size-8 text-[#335766] max-sm:size-7" />
          </div>
        </SheetTrigger>
        <SheetContent className="w-[325px] bg-gray-100" side={"left"}>
          <div className="fixed h-full w-[280px] flex-shrink-0 bg-gray-100 pb-4 max-md:-ml-2.5 max-md:-mt-5 md:border-r md:shadow-lg">
            <div className="flex flex-col">
              <div className="flex h-[60px] items-center px-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
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
                {/*TODO: Fix the scrollable list of voting rooms */}
                {votingRooms.map((votingRoom) => (
                  <Link
                    key={votingRoom.id}
                    href={`/votingRooms/${votingRoom.id}`}
                    className="truncate rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
                  >
                    {votingRoom.name}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-2 px-4">
                <div className="flex flex-col gap-2">
                  <Separator className="my-2 bg-black/20" />
                  <VotingRoomsOptions user={session?.user as any} />
                </div>
                <Separator className="my-2 bg-black/20" />
                <VotingProfileOptions
                  image={user.image || ""}
                  name={user.name || emailToName(user.email!)}
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="fixed hidden h-full w-[280px] flex-shrink-0 border-r bg-gray-100 pb-4 shadow-lg md:block">
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
            {/*TODO: Fix the scrollable list of voting rooms */}
            {votingRooms.map((votingRoom) => (
              <Link
                key={votingRoom.id}
                href={`/votingRooms/${votingRoom.id}`}
                className="truncate rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
              >
                {votingRoom.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 px-4">
            <div className="flex flex-col gap-2">
              <Separator className="my-2 bg-black/20" />
              <VotingRoomsOptions user={session?.user as any} />
            </div>
            <Separator className="my-2 bg-black/20" />
            <VotingProfileOptions
              image={user.image || ""}
              name={user.name || emailToName(user.email!)}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto max-md:-ml-1 md:ml-[280px]">
        {children}
      </div>
    </main>
  )
}
