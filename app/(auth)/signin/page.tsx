import AuthSignIn from "@/components/app/auth-signin"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account.",
}

const SignInPage = () => {
  return <AuthSignIn />
}

export default SignInPage
