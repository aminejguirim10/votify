"use client"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User, VotingRoom, Vote } from "@prisma/client"
import VotingUpdateVotingRoomForm from "@/components/form/voting-update-voting-room-form"
import { useState } from "react"
import VotingUpdateVoteForm from "../form/voting-update-vote-form"
const VotingVoteUpdateButton = ({
  user,
  votingRoom,
  vote,
}: {
  user: User
  votingRoom: VotingRoom
  vote: Vote
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button
          className="flex w-full items-center justify-start gap-3 font-semibold text-[#307491] hover:text-[#307491]"
          variant="outline"
        >
          <Icons.update className="size-4" />
          <span>Update Vote</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-primary">Update Vote</DialogTitle>
          <DialogDescription>Update the vote name and image.</DialogDescription>
        </DialogHeader>
        <VotingUpdateVoteForm
          open={isOpen}
          setIsOpen={setIsOpen}
          user={user}
          vote={vote}
          votingRoom={votingRoom}
        />
      </DialogContent>
    </Dialog>
  )
}

export default VotingVoteUpdateButton
