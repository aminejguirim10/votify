"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/shared/icons"
import { toast } from "sonner"

const VotingVotingRoomCopyCodeButton = ({
  votingRoomCode,
}: {
  votingRoomCode: string
}) => {
  return (
    <Button
      className="flex w-full items-center justify-start gap-3 font-semibold"
      variant="outline"
      onClick={() => {
        navigator.clipboard.writeText(votingRoomCode)
        toast("Code Copied", {
          style: {
            background: "#ebebe9",
            color: "#307491",
            fontWeight: "bold",
          },
          description: (
            <span className="text-sm text-muted-foreground">
              The code has been copied to your clipboard
            </span>
          ),
        })
      }}
    >
      <Icons.copy className="size-4" />
      <span> Copy voting room code</span>
    </Button>
  )
}

export default VotingVotingRoomCopyCodeButton
