"use client"
import { z } from "zod"
import { votingJoinVotingRoomSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/shared/icons"
import { MovingBorderSection } from "@/components/ui/moving-border"
import { useState } from "react"
import { joinVotingRoom } from "@/actions/voting-room.actions"
import { User } from "@prisma/client"
import { toast } from "@/hooks/use-toast"

const VotingJoinVotingRoomForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof votingJoinVotingRoomSchema>>({
    resolver: zodResolver(votingJoinVotingRoomSchema),
    defaultValues: {
      votingRoomCode: "",
    },
  })

  async function onSubmit(values: z.infer<typeof votingJoinVotingRoomSchema>) {
    setIsLoading(true)
    const response = await joinVotingRoom(values.votingRoomCode, user)
    if (response.status === 200) {
      toast({
        title: "Joined Voting Room",
        description: response.message,
        variant: "default",
      })
    } else {
      toast({
        title: "Error Joining Voting Room",
        description: response.message,
        variant: "destructive",
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
          <MovingBorderSection className="flex items-center gap-2 px-4">
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
                  {/* TODO: Add the error message */}
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="icon"
              className="size-8"
              disabled={isLoading}
            >
              <Icons.join className="size-4 text-gray-200" />
            </Button>
          </MovingBorderSection>
        </form>
      </Form>
    </div>
  )
}

export default VotingJoinVotingRoomForm
