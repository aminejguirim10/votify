import AuthForgotPassword from "@/components/form/auth-forgot-password"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot your password? No problem!",
}

const ForgotPasswordPage = () => {
  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 dark:bg-transparent md:py-32">
      <div className="m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border bg-muted shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
        <div className="-m-px rounded-[calc(var(--radius)+.125rem)] border bg-card p-8 pb-6">
          <div className="text-center">
            <Link href="/" aria-label="go home" className="mx-auto block w-fit">
              <Image
                src="/assets/logo.png"
                alt="logo"
                width={100}
                height={100}
                className="w-10"
              />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Recover Password
            </h1>
            <p className="text-sm">Enter your email to receive a reset link</p>
          </div>

          <div className="mt-6 space-y-6">
            <AuthForgotPassword />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              We'll send you a link to reset your password.
            </p>
          </div>
        </div>

        <div className="p-3">
          <p className="text-center text-sm text-accent-foreground">
            Remembered your password?
            <Button asChild variant="link" className="px-2">
              <Link href="/siginin">Log in</Link>
            </Button>
          </p>
        </div>
      </div>
    </section>
  )
}

export default ForgotPasswordPage
