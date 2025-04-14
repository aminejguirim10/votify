import { Button } from "@/components/ui/button"
import { Icons } from "@/components/shared/icons"

import { HomeNavigationSheet } from "@/components/layout/home-navigation-sheet"
import { HomeNavMenu } from "@/components/layout/home-nav-menu"
import Image from "next/image"
import Link from "next/link"

const HomeNavbar = () => {
  return (
    <nav className="fixed inset-x-4 top-6 z-10 mx-auto h-14 max-w-screen-md rounded-full border bg-zinc-100 dark:border-slate-700/70">
      <div className="mx-auto flex h-full items-center justify-between px-3">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="w-10"
          />
        </Link>

        {/* Desktop Menu */}
        <HomeNavMenu className="hidden md:block" />

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden rounded-full shadow-none sm:inline-flex"
            size="icon"
          >
            <Link
              href={"https://github.com/aminejguirim10/votify"}
              target="_blank"
            >
              <Icons.githubAuth className="h-5! w-5!" />
            </Link>
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <HomeNavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default HomeNavbar
