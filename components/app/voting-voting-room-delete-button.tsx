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
import { toast } from "@/hooks/use-toast"

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
                toast({
                  title: "Deleted Voting Room",
                  description: response.message,
                  variant: "default",
                })
              } else {
                toast({
                  title: "Error Deleting Voting Room",
                  description: response.message,
                  variant: "destructive",
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
