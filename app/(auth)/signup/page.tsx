import AuthSignUp from "@/components/app/auth-signup"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up for an account.",
}
const SignUpPage = () => {
  return <AuthSignUp />
}

export default SignUpPage
