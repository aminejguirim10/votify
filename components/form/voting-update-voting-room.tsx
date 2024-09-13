"use client"

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
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { votingUpdateVotingRoomSchema } from "@/lib/schema"
import { User, VotingRoom } from "@prisma/client"
import { updateVotingRoom } from "@/actions/voting-room.actions"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"

const VotingUpdateVotingRoom = ({
  user,
  votingRoom,
  setIsOpen,
  open,
}: {
  user: User
  votingRoom: VotingRoom
  setIsOpen: (open: boolean) => void
  open: boolean
}) => {
  const [date, setDate] = useState<Date>(votingRoom.deadline)
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof votingUpdateVotingRoomSchema>>({
    resolver: zodResolver(votingUpdateVotingRoomSchema),
    defaultValues: {
      deadline: new Date(votingRoom.deadline),
      name: votingRoom.name,
      description: votingRoom.description,
    },
  })
  async function onSubmit(
    values: z.infer<typeof votingUpdateVotingRoomSchema>
  ) {
    setIsLoading(true)

    const response = await updateVotingRoom(
      user,
      votingRoom,
      values.name,
      values.description,
      values.deadline
    )
    if (response.status === 200) {
      toast("Updated voting room", {
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
      toast("Error updating voting room", {
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
    setIsOpen(false)
    setIsLoading(false)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Voting Room Name"
                  {...field}
                  className="placeholder:text-gray-500"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Voting Room Description"
                  {...field}
                  className="placeholder:text-gray-500"
                  disabled={isLoading}
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormLabel className="font-bold">Deadline</FormLabel>
              <FormControl className="block">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                      disabled={isLoading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      {...field}
                      mode="single"
                      selected={date}
                      onSelect={setDate as any}
                      initialFocus
                      disabled={isLoading}
                    />
                    {/* TODO: Fix the time and disable the previous dates */}
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          Update
        </Button>
      </form>
    </Form>
  )
}

export default VotingUpdateVotingRoom
