"use client"

import { useRouter } from "next/router"
import { type ReactNode, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  BriefcaseBusiness,
  FileText,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Sparkles,
  User,

} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { SignedIn, useClerk, UserButton, useUser } from "@clerk/nextjs"


interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()

  const navigation = [
    { name: "Jobs", href: "/jobs", icon: BriefcaseBusiness },
    { name: "Resume", href: "/resume", icon: FileText },
    { name: "Cover Letters", href: "/cover-letter", icon: FileText },
    { name: "Mock Interview", href: "/interviews", icon: MessageSquare },
    { name: "Career Guidance", href: "/career-guidance", icon: MessageSquare },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  const { signOut } = useClerk()
  const { user } = useUser()


  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        {/* Sidebar with full height and smooth transition */}
        <aside
          className={cn(
            "fixed top-0 left-0 z-20 flex h-screen flex-col border-r bg-background transition-all duration-300 ease-in-out",
            sidebarOpen
              ? "w-64 translate-x-0"
              : "w-0 -translate-x-full md:translate-x-0 md:w-20"
          )}
        >
          <div className="flex h-16 items-center justify-between border-b px-4">
            <Link href="/" className={cn(
              "flex items-center gap-2 hover:opacity-80 transition",
              !sidebarOpen && "md:justify-center md:px-0"
            )}>
              <Sparkles className="h-6 w-6 text-primary flex-shrink-0" />
              <span className={cn(
                "text-xl font-bold transition-opacity duration-300",
                !sidebarOpen && "md:hidden"
              )}>JobGenie</span>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="transition-all duration-300 ease-in-out hover:bg-muted"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="h-5 w-5" />
              ) : (
                <PanelLeftOpen className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </div>

          <nav className="flex-1 overflow-auto py-4">
            <div className="px-3">
              <div className="space-y-1">

                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                      router.pathname === item.href || router.pathname.startsWith(`${item.href}/`)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      !sidebarOpen && "md:justify-center md:px-3 md:py-3"
                    )}
                    title={!sidebarOpen ? item.name : undefined}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className={cn(
                      "transition-opacity duration-300",
                      !sidebarOpen && "md:hidden"
                    )}>
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          <div className="p-8 border-t flex justify-between items-center">
            <div className="flex items-center gap-5">
              <div className="scale-125">
                <UserButton afterSignOutUrl="/" />
              </div>
              {user && (
                <span className="text-sm font-bold text-black">
                  {user.fullName || user.firstName || user.emailAddresses[0]?.emailAddress}
                </span>
              )}
            </div>
          </div>

        </aside>

        <main className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        )}>
          <div className="container p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}