"use client"

import { CardHeader, CardTitle, Card } from "@/components/ui/card"
import { Icons } from "@/components/shared/icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import VotingCreateVoteForm from "@/components/form/voting-create-vote-form"
import { User, VotingRoom } from "@prisma/client"
import { useState } from "react"
const VotingCreateVote = ({
  user,
  votingRoom,
}: {
  user: User
  votingRoom: VotingRoom
}) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Card className="w-fit lg:w-[300px]">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Icons.create className="size-6 text-[#335766]" />
              <CardTitle className="text-center text-[#335766]">
                Create New Vote
              </CardTitle>
            </div>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-primary">Create Vote</DialogTitle>
          <DialogDescription>
            Create a new vote to start voting.
          </DialogDescription>
        </DialogHeader>
        <VotingCreateVoteForm
          open={open}
          setOpen={setOpen}
          user={user}
          votingRoom={votingRoom}
        />
      </DialogContent>
    </Dialog>
  )
}

export default VotingCreateVote
