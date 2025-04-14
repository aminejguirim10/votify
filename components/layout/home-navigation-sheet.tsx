import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"
import { HomeNavMenu } from "./home-nav-menu"
import Link from "next/link"

export const HomeNavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white px-6">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="w-10"
          />
        </Link>
        <HomeNavMenu orientation="vertical" className="mt-12" />
      </SheetContent>
    </Sheet>
  )
}
