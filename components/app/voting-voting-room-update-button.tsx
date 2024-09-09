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
import { User, VotingRoom } from "@prisma/client"
import VotingUpdateVotingRoom from "@/components/form/voting-update-voting-room"
import { useState } from "react"

const VotingVotingRoomUpdateButton = ({
  user,
  votingRoom,
}: {
  user: User
  votingRoom: VotingRoom
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
          <span>Update voting room</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-primary">Update Voting Room</DialogTitle>
          <DialogDescription>
            Update the voting room name, description, and deadline.
          </DialogDescription>
        </DialogHeader>
        <VotingUpdateVotingRoom
          user={user}
          votingRoom={votingRoom}
          open={isOpen}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  )
}

export default VotingVotingRoomUpdateButton
