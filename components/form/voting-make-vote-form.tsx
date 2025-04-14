"use client"

import { User, Vote } from "@prisma/client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { toast } from "sonner"
import { votingMakeVote } from "@/lib/schema"
import { Checkbox } from "@/components/ui/checkbox"
import { makeVote } from "@/actions/vote.actions"

const VotingMakeVoteForm = ({
  open,
  setOpen,
  user,
  votes,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  user: User
  votes: Vote[]
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof votingMakeVote>>({
    resolver: zodResolver(votingMakeVote),
    defaultValues: {
      vote: "",
    },
  })
  const vote = form.watch("vote")
  async function onSubmit(values: z.infer<typeof votingMakeVote>) {
    setIsLoading(true)

    const response = await makeVote(values.vote, user.id)
    if (response.status === 200) {
      toast("Vote made succeful", {
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
    } else if (response.status == 409) {
      toast("You already voted for this choice", {
        style: {
          background: "#f5a623",
          color: "black",
          fontWeight: "bold",
        },
        description: (
          <span className="text-sm text-black/80">{response.message}</span>
        ),
      })
    } else {
      toast("Error in the vote", {
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
    setOpen(false)
    setIsLoading(false)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-2 grid grid-cols-3 gap-2">
          {votes.map((vote) => (
            <FormField
              control={form.control}
              name="vote"
              key={vote.id}
              render={({ field }) => (
                <FormItem className="flex items-end gap-2">
                  <FormControl>
                    <Checkbox
                      {...field}
                      checked={field.value === vote.id}
                      value={vote.id}
                      id={vote.vote}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange(vote.id)
                        } else {
                          field.onChange("")
                        }
                      }}
                    />
                  </FormControl>
                  <FormLabel className="-mt-2 font-bold" htmlFor={vote.id}>
                    {vote.vote}
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || !vote}>
          Confirm
        </Button>
      </form>
    </Form>
  )
}

export default VotingMakeVoteForm
