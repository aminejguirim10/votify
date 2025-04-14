import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu"
import Link from "next/link"

export const HomeNavMenu = ({ className, ...props }: NavigationMenuProps) => (
  <NavigationMenu
    className={cn("data-[orientation=vertical]:items-start", className)}
    {...props}
  >
    <NavigationMenuList className="gap-2 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          className="rounded-md px-4 py-2 transition-all duration-300 hover:bg-gray-200"
        >
          <Link href="#about">About</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          className="rounded-md px-4 py-2 transition-all duration-300 hover:bg-gray-200"
        >
          <Link href="#services">Services</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          className="rounded-md px-4 py-2 transition-all duration-300 hover:bg-gray-200"
        >
          <Link href="/signin">Sign In</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          className="rounded-md px-4 py-2 transition-all duration-300 hover:bg-gray-200"
        >
          <Link href="/contact">Contact</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
)
