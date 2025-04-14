import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import AuthSignUpForm from "@/components/form/auth-signup-form"

const AuthSignUp = () => {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <div className="mx-auto flex h-fit w-full max-w-7xl justify-center gap-4 px-4 sm:px-6 md:flex-row lg:justify-between lg:px-8">
        <div>
          <Card className="h-full shadow-2xl">
            <CardHeader className="flex flex-col gap-2">
              <Link href={"/"} className="w-fit">
                <div className="flex items-center gap-1">
                  <Image
                    src={"/assets/logo.png"}
                    width={215}
                    height={187}
                    className="size-8 md:size-10"
                    alt="logo"
                  />
                  <CardTitle className="text-xl font-bold text-primary/90 md:text-2xl">
                    Votify
                  </CardTitle>
                </div>
              </Link>
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold md:text-3xl">
                  Create your Account
                </h2>
                <CardDescription>
                  Start your website in seconds. Already have an account?{" "}
                  <Link
                    href={"/signin"}
                    className="font-semibold text-primary/90 hover:underline"
                  >
                    Login here.
                  </Link>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <AuthSignUpForm />
            </CardContent>
          </Card>
        </div>
        <div className="hidden lg:block lg:w-1/2">
          <Image
            src={"/assets/img1.png"}
            width={740}
            height={740}
            alt="signup image"
            className="md:h-full"
          />
        </div>
      </div>
    </section>
  )
}

export default AuthSignUp
