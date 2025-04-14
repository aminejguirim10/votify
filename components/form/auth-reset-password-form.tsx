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
import { Dispatch, SetStateAction, useState } from "react"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { authResetPasswordSchema } from "@/lib/schema"
import { Icons } from "@/components/shared/icons"
import { resetPassword } from "@/actions/user.actions"

const AuthResetPasswordForm = ({
  id,
  token,
}: {
  id: string
  token: string
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()
  const form = useForm<z.infer<typeof authResetPasswordSchema>>({
    resolver: zodResolver(authResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  })
  function onSubmit(values: z.infer<typeof authResetPasswordSchema>) {
    const handleSubmit = async () => {
      setLoading(true)
      try {
        if (values.password !== confirmPassword) {
          toast({
            title: "Password mismatch",
            description: "Password and Confirm password must match",
            variant: "destructive",
          })
          setLoading(false)
          return
        }
        const response = await resetPassword(id, token, values.password)
        if (response.status === 200) {
          form.reset()
          toast({
            title: "Password updated",
            description: "Your password has been updated",
          })
          router.replace("/signin")
        } else {
          toast({
            title: "Error",
            description: response.message,
            variant: "destructive",
          })
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    handleSubmit()
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">New password</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input
                    placeholder="**************"
                    {...field}
                    type={showPassword ? "text" : "password"}
                    disabled={loading}
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
        <ConfirmPassword
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          loading={loading}
        />

        <Button type="submit" disabled={loading} className="flex w-full gap-3">
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
          {loading ? "Loading" : "Submit"}
        </Button>
      </form>
    </Form>
  )
}
const ConfirmPassword = ({
  confirmPassword,
  setConfirmPassword,
  loading,
}: {
  confirmPassword: string
  setConfirmPassword: Dispatch<SetStateAction<string>>
  loading: boolean
}) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="flex flex-col gap-3">
      <FormLabel className="font-bold">Confirm Your password</FormLabel>
      <div className="flex items-center">
        <Input
          placeholder="**************"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
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
    </div>
  )
}
export default AuthResetPasswordForm
