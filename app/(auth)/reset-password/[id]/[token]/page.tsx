import AuthResetPasswordForm from "@/components/form/auth-reset-password-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password.",
}

const ResetPasswordPage = ({
  params: { id, token },
}: {
  params: { id: string; token: string }
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card className="h-fit w-[350px] shadow-lg md:w-[550px]">
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background py-2 md:py-4 md:shadow-xl">
          <CardHeader className="flex gap-2">
            <Link href="/" aria-label="go home" className="mx-auto block w-fit">
              <Image
                src="/assets/logo.png"
                alt="logo"
                width={100}
                height={100}
                className="w-10"
              />
            </Link>
            <CardTitle className="text-center">Reset your password</CardTitle>
            <CardDescription className="text-center">
              Please enter your new password below
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full">
            <AuthResetPasswordForm id={id} token={token} />
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

export default ResetPasswordPage
