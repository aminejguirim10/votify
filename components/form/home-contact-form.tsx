"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"
import { homeContactSchema } from "@/lib/schema"
import { contactUser } from "@/actions/user.actions"

const HomeContactForm = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof homeContactSchema>>({
    resolver: zodResolver(homeContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      subject: "",
    },
  })
  async function onSubmit(values: z.infer<typeof homeContactSchema>) {
    setLoading(true)
    try {
      const response = await contactUser(
        values.firstName,
        values.lastName,
        values.email,
        values.subject,
        values.message
      )

      if (response.status === 200) {
        toast({
          title: "Email sent",
          description: (
            <span className="text-sm text-muted-foreground">
              Your email has been sent successfully
            </span>
          ),
          style: {
            background: "#ebebe9",
            color: "#307491",
            fontWeight: "bold",
          },
        })
      } else {
        setLoading(false)
        toast({
          title: "Email not sent",
          description: "Your email has not been sent successfully",
          style: {
            background: "#af0808",
            color: "black",
            fontWeight: "bold",
          },
        })
      }
    } catch (error) {
      toast({
        title: "Email not sent",
        description: "Your email has not been sent successfully",
        style: {
          background: "#af0808",
          color: "black",
          fontWeight: "bold",
        },
      })
    } finally {
      setLoading(false)
      form.reset()
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto -mb-10 flex max-w-7xl flex-col gap-4 py-4 md:-mb-4"
      >
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        ></div>

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="font-semibold">First Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="font-semibold">Last Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="font-semibold">Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="font-semibold">Subject</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="font-semibold">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder=""
                  {...field}
                  rows={3}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="my-5 flex w-full gap-3 text-white"
          disabled={loading}
        >
          {loading && (
            <svg
              aria-hidden="true"
              className="inline h-6 w-6 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
          {loading ? "Loading" : "Let's Talk"}
        </Button>
      </form>
    </Form>
  )
}

export default HomeContactForm
