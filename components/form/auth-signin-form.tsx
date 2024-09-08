"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { authSignInSchema } from "@/lib/schema"
import { signIn } from "next-auth/react"
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
import { Icons } from "@/components/shared/icons"
import { toast } from "@/hooks/use-toast"
import AuthProvidersButtons from "@/components/shared/auth-providers-buttons"
import { Separator } from "@/components/ui/separator"

const AuthSignInForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof authSignInSchema>>({
    resolver: zodResolver(authSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  function onSubmit(values: z.infer<typeof authSignInSchema>) {
    const handleSubmit = async () => {
      setLoading(true)
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })
      if (response?.ok) {
        router.push("/votingRooms")
      } else {
        toast({
          title: "Invalid email or incorrect Password",
          description: "Please try again",
          variant: "destructive",
        })
        setLoading(false)
      }
    }
    handleSubmit()
  }
  return (
    <Form {...form}>
      <div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                    type="email"
                    disabled={loading}
                    className="placeholder:text-gray-500"
                  />
                </FormControl>
                {form.formState.errors.email && (
                  <FormMessage className="text-xs" />
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Password</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      placeholder="**************"
                      {...field}
                      type={showPassword ? "text" : "password"}
                      disabled={loading}
                      className="placeholder:text-gray-500"
                    />
                    {showPassword ? (
                      <Icons.eyeSlash
                        className="-ml-8 h-5 w-5 hover:cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    ) : (
                      <Icons.eye
                        className="-ml-8 h-5 w-5 hover:cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    )}
                  </div>
                </FormControl>
                {form.formState.errors.password && (
                  <FormMessage className="text-xs" />
                )}
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"outline"}
            disabled={loading}
            className="flex w-full gap-3 font-bold"
          >
            {loading && (
              <svg
                aria-hidden="true"
                className="inline h-6 w-6 animate-spin fill-primary text-gray-200 dark:text-gray-600"
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
            {loading ? "Loading" : "Sign In"}
          </Button>
        </form>
        <div className="flex items-center justify-center gap-3 py-6">
          <Separator className="w-[45%] bg-gray-300" />
          <span className="text-sm font-medium text-muted-foreground">or</span>
          <Separator className="w-[45%] bg-gray-300" />
        </div>
        <div className="max-md:pb-6">
          <AuthProvidersButtons text="Sign up" loading={loading} />
        </div>
      </div>
    </Form>
  )
}

export default AuthSignInForm
