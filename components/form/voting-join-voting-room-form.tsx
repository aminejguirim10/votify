"use client"
import { z } from "zod"
import { votingJoinVotingRoomSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/shared/icons"
import { useState } from "react"
import { joinVotingRoom } from "@/actions/voting-room.actions"
import { User } from "@prisma/client"
import { toast } from "sonner"

const VotingJoinVotingRoomForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof votingJoinVotingRoomSchema>>({
    resolver: zodResolver(votingJoinVotingRoomSchema),
    defaultValues: {
      votingRoomCode: "",
    },
  })

  const votingRoomCode = form.watch("votingRoomCode")
  async function onSubmit(values: z.infer<typeof votingJoinVotingRoomSchema>) {
    setIsLoading(true)
    const response = await joinVotingRoom(values.votingRoomCode, user)
    if (response.status === 200) {
      toast("Joined Voting Room", {
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
      toast("Error Joining Voting Room", {
        style: {
          background: "#af0808",
          color: "black",
          fontWeight: "bold",
        },
        description: (
          <span className="text-sm text-black/80">{response.message}</span>
        ),
      })
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-2 py-2"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-black/15 px-3 py-1.5">
            <FormField
              control={form.control}
              name="votingRoomCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Voting Room Code"
                      {...field}
                      className="h-8 placeholder:text-gray-500"
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="icon"
              className="size-8"
              disabled={isLoading || votingRoomCode.length !== 6}
            >
              <Icons.join className="size-4 text-gray-200" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default VotingJoinVotingRoomForm
