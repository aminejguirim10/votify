"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/shared/icons"
import VotingCreateVotingRoomForm from "@/components/form/voting-create-voting-room-form"
import { User } from "@prisma/client"
import { useState } from "react"
import { Info } from "lucide-react"

const VotingCreateVotingRoom = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:cursor-pointer hover:bg-muted hover:text-primary">
          <Icons.create className="size-4" />
          <span>Create Voting Room</span>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary">Create Voting Room</DialogTitle>
          <DialogDescription className="flex flex-col gap-1 text-sm text-muted-foreground">
            <p>Create a new voting room to start voting.</p>
            <span className="flex items-center gap-1">
              <Info className="size-4 text-orange-400" />
              Please fill all the fields and select a date for the deadline.
            </span>
          </DialogDescription>
        </DialogHeader>
        <VotingCreateVotingRoomForm
          user={user}
          setIsOpen={setIsOpen}
          open={isOpen}
        />
      </DialogContent>
    </Dialog>
  )
}

export default VotingCreateVotingRoom
