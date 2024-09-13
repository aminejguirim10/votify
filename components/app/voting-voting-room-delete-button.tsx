"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { deleteVotingRoom } from "@/actions/voting-room.actions"
import { User, VotingRoom } from "@prisma/client"
import { toast } from "sonner"

const VotingVotingRoomDeleteButton = ({
  user,
  votingRoom,
}: {
  user: User
  votingRoom: VotingRoom
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="flex w-full items-center justify-start gap-3 font-semibold text-red-500 hover:text-red-900"
          variant="outline"
        >
          <Icons.delete className="size-4" />
          <span>Delete voting room</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            voting room and all its data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-500"
            onClick={async () => {
              const response = await deleteVotingRoom(user, votingRoom)
              if (response.status === 200) {
                toast("Deleted Voting Room", {
                  style: {
                    background: "#ebebe9",
                    color: "#307491",
                    fontWeight: "bold",
                  },
                  description: (
                    <span className="text-sm text-muted-foreground">
                      {response.message}
                    </span>
                  ),
                })
              } else {
                toast("Error Deleting Voting Room", {
                  style: {
                    background: "#af0808",
                    color: "black",
                    fontWeight: "bold",
                  },
                  description: (
                    <span className="text-sm text-black/80">
                      {response.message}
                    </span>
                  ),
                })
              }
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default VotingVotingRoomDeleteButton
