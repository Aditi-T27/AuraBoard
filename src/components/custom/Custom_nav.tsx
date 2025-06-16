// ResponsiveNavbar.tsx
"use client"
type CustomeNavProps={
  username:string|null,
  email:string|null,
  id:string,
}
import * as React from "react"
import Link from "next/link"
import { MenuIcon, XIcon } from "lucide-react"
import axios from "axios"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "Preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description: "Shows the completion status of a task.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Scrollable content container.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description: "Tabbed sections for layered content.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description: "Extra info on hover or focus.",
  },
]

export default function ResponsiveNavbar({username,email,id}:CustomeNavProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [titles, setTitles] = React.useState<string[]>([]);
  
//get Titles
  const onSelect = async () => {
    const response = await axios.get("/api/users/list", { params: { id } });
    const data = response.data;
  
      if (response.data && response.data.data) {
      const fetchedTitles = response.data.data.map((entry: any) => entry.title);
        setTitles(fetchedTitles);
      }
    
  }

  return (
    <nav className="w-full bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 text-white shadow-2xl z-[999] backdrop-blur-sm border-b border-purple-500/30 relative">
      <div className="mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 hover:scale-110 transition-all duration-300 hover:rotate-1 group">
          <div className="bg-gradient-to-br from-white to-purple-100 rounded-full p-1 shadow-xl ring-2 ring-purple-400/50 group-hover:ring-yellow-400/70 transition-all duration-300">
            <img 
              src="https://th.bing.com/th/id/OIP.GA1qmcjf_degRqAdggT9AwHaHa?w=184&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" 
              alt="AuraWord Logo" 
              className="w-10 h-10 rounded-full group-hover:animate-spin transition-all duration-500" 
            />
          </div>
          <span className="text-3xl font-black tracking-wider text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text drop-shadow-2xl animate-pulse hover:animate-bounce transition-all duration-300 font-mono">
            AuraWord
          </span>
        </Link>
        <button onClick={onSelect}>clk</button>

               <Link href="/" className="flex items-center gap-3 hover:scale-110 transition-all duration-300 hover:rotate-1 group">
          <div className="bg-gradient-to-br from-white to-purple-100 rounded-full p-1 shadow-xl ring-4 ring-purple-400/50 group-hover:ring-yellow-400/70 transition-all duration-300">
           
          </div>
          <span className="text-4xl font-black tracking-wider text-transparent bg-gradient-to-r from-yellow-300 via-pink-550 to-purple-500 bg-clip-text drop-shadow-2xl animate-pulse hover:animate-bounce transition-all duration-300 font-medium">
              {username?`Welcome, ${username}.Your Stories await!`:null}
          </span>
        </Link>
       

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-purple-800/50 hover:bg-purple-700/70 transition-all duration-300 hover:scale-110 hover:rotate-180 shadow-lg"
          >
            {isOpen ? 
              <XIcon className="w-6 h-6 text-yellow-300 animate-pulse" /> : 
              <MenuIcon className="w-6 h-6 text-yellow-300 hover:animate-bounce" />
            }
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <NavigationLinks titles={titles} onSelect={onSelect} isMobile={false} id={id} />

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden px-6 pb-4 bg-gradient-to-b from-purple-900/95 to-indigo-900/95 backdrop-blur-md border-t border-purple-500/30 z-[999] relative">
          <NavigationLinks titles={titles} onSelect={onSelect} isMobile id={id} />
        </div>
      )}
    </nav>
  )
}

function NavigationLinks({
  isMobile = false,
  titles = [],
  onSelect = () => {},
  id,
}: {
  isMobile?: boolean
  titles?: string[]
  onSelect?: () => void
  id: string
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList
        className={`flex flex-col lg:flex-row ${isMobile ? "gap-4 mt-4" : "gap-8"}`}
      >
        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:text-yellow-300 text-lg font-bold tracking-wide hover:scale-105 transition-all duration-300 hover:drop-shadow-lg hover:animate-pulse font-serif bg-gradient-to-r from-purple-700/50 to-indigo-700/50 rounded-lg px-4 py-2 hover:from-purple-600/70 hover:to-indigo-600/70">
            🏠 Home
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-[1000] absolute mt-2 bg-gradient-to-br from-white via-purple-50 to-indigo-50 text-black rounded-2xl p-6 shadow-2xl border border-purple-200 backdrop-blur-sm">
            <ul className="grid gap-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="bg-gradient-to-br from-purple-600 via-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-xl hover:scale-105 hover:rotate-1 transition-all duration-300 hover:shadow-2xl border border-purple-400/50 hover:border-yellow-400/70"
                  >
                    <div className="text-2xl font-black tracking-wide font-mono drop-shadow-lg">✨ AuraDraw</div>
                    <p className="text-sm font-medium mt-2 opacity-90 font-serif">Format your Expressions! AuraDraw it!</p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="📖 Introduction">
                Reusable components with Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="⚡ Installation">
                How to set up and install everything.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="🎨 Typography">
                Typography styles and guidelines.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:text-yellow-300 text-lg font-bold tracking-wide hover:scale-105 transition-all duration-300 hover:drop-shadow-lg hover:animate-pulse font-serif bg-gradient-to-r from-purple-700/50 to-indigo-700/50 rounded-lg px-4 py-2 hover:from-purple-600/70 hover:to-indigo-600/70">
            🧩 Components
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-gradient-to-br from-white via-purple-50 to-indigo-50 text-black rounded-2xl p-6 shadow-2xl border border-purple-200 backdrop-blur-sm z-[999]">
            <ul className="grid w-[500px] gap-4 md:grid-cols-2">
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

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:text-yellow-300 text-lg font-bold tracking-wide hover:scale-105 transition-all duration-300 hover:drop-shadow-lg hover:animate-pulse font-serif bg-gradient-to-r from-purple-700/50 to-indigo-700/50 rounded-lg px-4 py-2 hover:from-purple-600/70 hover:to-indigo-600/70">
            📋 List
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-gradient-to-br from-white via-purple-50 to-indigo-50 text-black rounded-2xl p-6 shadow-2xl border border-purple-200 backdrop-blur-sm z-[999]">
            <ul className="grid w-[350px] gap-4" onClick={onSelect}>
          {titles.length === 0 ? (
            <li className="text-gray-500">Click to load journal titles</li>
          ) : (
            titles.map((title, index) => (
              <Link href={{pathname:"/dashboard",query:{title:title, userId:id}}}>
              <li key={index} className="space-y-2">
                {title}
              </li>
              </Link>
            ))
          )}
        </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block rounded-xl px-5 py-3 hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100 text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg border border-transparent hover:border-purple-200 group"
        >
          <div className="font-black text-purple-800 font-mono tracking-wide group-hover:text-purple-600 transition-colors">
            {title}
          </div>
          <p className="text-xs text-gray-600 mt-1 font-serif leading-relaxed group-hover:text-gray-700">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

function NavLink({ title }: { title: string }) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href="#"
        className="block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100 text-sm transition-all duration-300 hover:scale-105 hover:shadow-md border border-transparent hover:border-purple-200 group"
      >
        <div className="font-bold text-purple-800 font-mono tracking-wide group-hover:text-purple-600 transition-colors">
          {title}
        </div>
      </Link>
    </NavigationMenuLink>
  )
}