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
    title: "Home Page",
    href: "/",
    description: "Creative Writing",
  },
  {
    title: "Dasbboard",
    href: "/dashboard",
    description: "Note Making",
  },
  
]

export default function ResponsiveNavbar({username,email,id}:CustomeNavProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [titles, setTitles] = React.useState<string[]>([]);
  
//get Titles
  const onSelect = async () => {
    const response = await axios.get("/api/users/list", { params: { id } });
    // const data = response.data;
  
      if (response.data && response.data.data) {
      const fetchedTitles = response.data.data.map((entry: unknown) => {
        if (typeof entry === "object" && entry !== null && "title" in entry) {
          return (entry as { title: string }).title;
        }
        return "";
      });
      setTitles(fetchedTitles);
      }
    
  }

  return (
    <nav className="w-full bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 text-white shadow-2xl z-[999] backdrop-blur-sm border-b border-purple-500/30 relative">
      <div className="mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link  href={{
                            pathname: '/dashboard',
                                    query: { username: username, email: email },
                           }} className="flex items-center gap-3 hover:scale-110 transition-all duration-300 hover:rotate-1 group">
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
                    href=""
                    className="bg-gradient-to-br from-purple-600 via-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-xl hover:scale-105 hover:rotate-1 transition-all duration-300 hover:shadow-2xl border border-purple-400/50 hover:border-yellow-400/70"
                  >
                    <div className="text-2xl font-black tracking-wide font-mono drop-shadow-lg">✨ AuraDraw</div>
                    <p className="text-sm font-medium mt-2 opacity-90 font-serif">Format your Expressions! AuraDraw it!</p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="📖 NotE Making">
                Enhance  Creativity
              </ListItem>
              <ListItem href="/docs/installation" title="⚡ Editable">
                Easier Updates
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="🎨 Typography">
                Style and Edits
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
            📋 Your Journal Collection
          </NavigationMenuTrigger>
          {/* <NavigationMenuContent className="bg-gradient-to-br from-white via-purple-50 to-indigo-50 text-black rounded-2xl p-6 shadow-2xl border border-purple-200 backdrop-blur-sm z-[999]">
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
          </NavigationMenuContent> */}


          <NavigationMenuContent className="bg-gradient-to-br from-white via-purple-50 to-indigo-50 text-black rounded-2xl p-6 shadow-2xl border border-purple-200 backdrop-blur-sm z-[999]">
  <div className="w-[400px]">
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-purple-800 mb-2">Your Journal Entries</h3>
      <div className="h-px bg-gradient-to-r from-purple-300 to-indigo-300 mb-4"></div>
    </div>
    
    <ul className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar" onClick={onSelect}>
      {titles.length === 0 ? (
        <li className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-3">
            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium"> Journal Entries </p>
          <p className="text-gray-400 text-2xl mt-1 hover:cursor-pointer"><b>Click here to load your journal titles</b></p>
        </li>
      ) : (
        titles.map((title, index) => (
          <Link 
            key={index}
            href={{
              pathname: "/dashboard",
              query: { title: title, userId: id }
            }}
          >
            <li className="group cursor-pointer transform transition-all duration-200 hover:scale-[1.02]">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100 shadow-sm hover:shadow-md hover:bg-white/80 hover:border-purple-200 transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 group-hover:text-purple-700 transition-colors duration-200 truncate">
                      {title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Journal Entry #{index + 1}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        ))
      )}
    </ul>
    
    {titles.length > 0 && (
      <div className="mt-4 pt-4 border-t border-purple-200">
        <div className="flex items-center justify-between text-sm text-purple-600">
          <span className="font-medium">{titles.length} journal{titles.length !== 1 ? 's' : ''} found</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Ready to edit</span>
          </div>
        </div>
      </div>
    )}
  </div>
  
  <style jsx>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(139, 92, 246, 0.1);
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, #8b5cf6, #6366f1);
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(to bottom, #7c3aed, #4f46e5);
    }
  `}</style>
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

// function NavLink({ title }: { title: string }) {
//   return (
//     <NavigationMenuLink asChild>
//       <Link
//         href="#"
//         className="block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100 text-sm transition-all duration-300 hover:scale-105 hover:shadow-md border border-transparent hover:border-purple-200 group"
//       >
//         <div className="font-bold text-purple-800 font-mono tracking-wide group-hover:text-purple-600 transition-colors">
//           {title}
//         </div>
//       </Link>
//     </NavigationMenuLink>
//   )
// }