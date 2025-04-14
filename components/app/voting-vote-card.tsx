import { Card, CardTitle } from "@/components/ui/card"
import { User, Vote, VotingRoom } from "@prisma/client"
import Image from "next/image"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/shared/icons"
import { Separator } from "@/components/ui/separator"
import VotingVoteDeleteButton from "@/components/app/voting-vote-delete-button"
import VotingVoteUpdateButton from "./voting-vote-update-button"

const VotingVoteCard = ({
  vote,
  user,
  votingRoom,
}: {
  vote: Vote
  user: User
  votingRoom: VotingRoom
}) => {
  return (
    <Card className="flex flex-col justify-between">
      <div className="size-full rounded-t-xl bg-[#DDDDDD]">
        <Image
          src={vote.url ? vote.url : "https://placehold.co/664x410?text=Votify"}
          alt={vote.vote}
          width={1500}
          height={1500}
          className="h-[300px] w-full rounded-t-xl"
        />
      </div>

      <CardTitle className="flex items-center justify-between gap-4 space-y-1.5 border-t p-6">
        <span className="truncate text-[#307491]">{vote.vote}</span>
        {votingRoom.creatorId === user.id && (
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
                  <>
                    <VotingVoteUpdateButton
                      user={user}
                      vote={vote}
                      votingRoom={votingRoom}
                    />
                    <VotingVoteDeleteButton
                      user={user}
                      vote={vote}
                      votingRoom={votingRoom}
                    />
                  </>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </CardTitle>
    </Card>
  )
}

export default VotingVoteCard
