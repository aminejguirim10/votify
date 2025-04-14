"use client"

import { Icons } from "@/components/shared/icons"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import VotingMakeVoteForm from "../form/voting-make-vote-form"
import { User, Vote } from "@prisma/client"
import { Info } from "lucide-react"

const VotingMakeVote = ({ user, votes }: { user: User; votes: Vote[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="h-[100px] w-[200px] rounded-xl border bg-[#E6AD00]/85">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="font-bold">
            <span>Make</span>
            <span className="text-primary"> Vote</span>
          </div>
          <Icons.votingRoom className="size-6" />
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-primary">Make Vote</DialogTitle>
          <DialogDescription>
            Select the vote and make your choice.
            <span className="flex items-center gap-1">
              <Info className="size-4 text-orange-400" />
              You can only vote once for each attendee.
            </span>
            <span className="flex items-center gap-1">
              <Info className="size-4 text-orange-400" />
              You can not vote more than once for the same attendee.
            </span>
          </DialogDescription>
        </DialogHeader>
        <VotingMakeVoteForm
          open={isOpen}
          setOpen={setIsOpen}
          user={user}
          votes={votes}
        />
      </DialogContent>
    </Dialog>
  )
}

export default VotingMakeVote
