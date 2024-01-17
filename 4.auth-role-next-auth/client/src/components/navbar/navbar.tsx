"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navbar/shadcn-navigation-menu";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import Switcher from "@/components/theme/ModeToggle/Mode";
import { ShadcnButton } from "@/components/ui/button/ShadcnButton";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavigationMenuDemo() {
  const router = useRouter();
  return (
    <>
      <nav className="bg-gray-700/20 dark:bg-[#1a1a1a]/70 mx-1 lg:flex backdrop-blur-sm fixed top-0 z-50 mt-4 py-1">
        <div className="w-screen flex flex-wrap items-center justify-between mx-auto px-12 p-1">
          <div className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <NavigationMenu>
              <NavigationMenuList className="flex justify-between gap-8">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Demo Navbar</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-full lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="#"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              NextAuth
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Here we will learn about next auth and how to use
                              it with next js and we will also learn about how
                              to use next js with tailwind css.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="#" title="Nav Title 1">
                        Navigation 1
                      </ListItem>
                      <ListItem href="#" title="Nav Title 2">
                        Navigation 2
                      </ListItem>
                      <ListItem href="#" title="Nav Title 3">
                        Navigation 3
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className=" w-full md:w-auto" id="navbar-default">
            <ul className="">
              <NavigationMenu>
                <NavigationMenuItem>
                  <Switcher />
                </NavigationMenuItem>
              </NavigationMenu>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
