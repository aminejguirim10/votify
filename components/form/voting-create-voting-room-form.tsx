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

import { cn, generateUniqueCode } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { votingCreateVotingRoomSchema } from "@/lib/schema"
import { User } from "@prisma/client"
import { createVotingRoom } from "@/actions/voting-room.actions"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"

const VotingCreateVotingRoomForm = ({
  user,
  setIsOpen,
  open,
}: {
  user: User
  setIsOpen: (open: boolean) => void
  open: boolean
}) => {
  const [date, setDate] = useState<Date>()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof votingCreateVotingRoomSchema>>({
    resolver: zodResolver(votingCreateVotingRoomSchema),
    defaultValues: {
      deadline: new Date(),
      name: "",
      description: "",
    },
  })
  async function onSubmit(
    values: z.infer<typeof votingCreateVotingRoomSchema>
  ) {
    setIsLoading(true)

    const response = await createVotingRoom(
      user,
      generateUniqueCode(),
      values.description,
      values.name,
      date!
    )

    if (response.status === 201) {
      toast("Voting room created successfully", {
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
      toast("Error creating voting room", {
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
                      onSelect={setDate}
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
        <Button type="submit" className="w-full" disabled={isLoading || !date}>
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default VotingCreateVotingRoomForm
