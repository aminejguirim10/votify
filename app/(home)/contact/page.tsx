import { Card } from "@/components/ui/card"
import Link from "next/link"
import HomeContactForm from "@/components/form/home-contact-form"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Contact",
  description: "Contact us.",
}

const ContactPage = () => {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-4xl px-4 lg:px-0">
        <h1 className="mb-12 text-center text-4xl font-semibold lg:text-5xl">
          Help us route your inquiry
        </h1>

        <div className="grid divide-y border md:grid-cols-2 md:gap-4 md:divide-x md:divide-y-0">
          <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
            <div>
              <h2 className="mb-3 text-lg font-semibold">Collaborate</h2>
              <Link
                href="mailto:aminejguirim10@gmail.com"
                className="text-lg text-primary hover:underline dark:text-primary/80"
              >
                aminejguirim10@gmail.com
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
            <div>
              <h3 className="mb-3 text-lg font-semibold">Press</h3>
              <Link
                href="mailto:aminejguirim10@gmail.com"
                className="text-lg text-primary hover:underline dark:text-primary/80"
              >
                aminejguirim10@gmail.com
              </Link>
            </div>
          </div>
        </div>

        <div className="h-3 border-x bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)]"></div>
        <div className="border px-4 py-12 lg:px-0 lg:py-24">
          <Card className="mx-auto max-w-lg p-8 sm:p-16">
            <h3 className="text-xl font-semibold">
              Let's get you to the right place
            </h3>
            <p className="mt-4 text-sm">
              We are here to help you with your questions and concerns. Please
              fill out the form below and we will get back to you as soon as
              possible.
            </p>

            <HomeContactForm />
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ContactPage
