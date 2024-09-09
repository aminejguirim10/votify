import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { VotingRoomFetched } from "@/types"
import { User } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/shared/icons"

import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import VotingVotingRoomCopyCodeButton from "@/components/app/voting-voting-room-copy-code-button"
import VotingVotingRoomUpdateButton from "@/components/app/voting-voting-room-update-button"
import VotingVotingRoomDeleteButton from "@/components/app/voting-voting-room-delete-button"
import Link from "next/link"

const VotingVotingRoomCard = ({
  votingRoom,
  user,
}: {
  votingRoom: VotingRoomFetched
  user: User
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-3">
            <Badge
              variant={votingRoom.creatorId === user.id ? "default" : "voter"}
              className="mb-1 w-fit"
            >
              {votingRoom.creatorId === user.id ? "Creator" : "Voter"}
            </Badge>
            <Icons.bar className="text-[#307491]" />
            <code className="-ml-4 rounded-md bg-[#E6DB00] px-2 text-sm">
              {votingRoom.votingRoomCode}
            </code>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Icons.more className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="mt-1 w-fit" align="end">
              <div className="flex flex-col gap-2">
                <div className="ml-3 text-sm font-semibold">Actions</div>
                <Separator />
                <div className="flex flex-col gap-1.5">
                  <VotingVotingRoomCopyCodeButton
                    votingRoomCode={votingRoom.votingRoomCode}
                  />
                  {votingRoom.creatorId === user.id && (
                    <>
                      <VotingVotingRoomUpdateButton
                        user={user}
                        votingRoom={votingRoom}
                      />
                      <VotingVotingRoomDeleteButton
                        user={user}
                        votingRoom={votingRoom}
                      />
                    </>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <CardTitle className="max-w-96 truncate lg:max-w-xs xl:max-w-xl">
          <Link href={`/votingRooms/${votingRoom.id}`}>{votingRoom.name}</Link>
        </CardTitle>
        <CardDescription className="line-clamp-4">
          {votingRoom.description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default VotingVotingRoomCard
