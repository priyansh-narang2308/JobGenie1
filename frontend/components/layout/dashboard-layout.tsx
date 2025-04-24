"use client"

import { useRouter } from "next/router"
import { type ReactNode, useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  BriefcaseBusiness,
  FileText,
  Gauge,
  GraduationCap,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Sparkles,
  User,
  X,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Gauge },
    { name: "Jobs", href: "/jobs", icon: BriefcaseBusiness },
    { name: "Resume", href: "/resume", icon: FileText },
    { name: "Cover Letters", href: "/cover-letter", icon: FileText },
    { name: "Interviews", href: "/interviews", icon: MessageSquare },
    { name: "Career Guidance", href: "/career-guidance", icon: MessageSquare },
    { name: "Learning", href: "/learning", icon: GraduationCap },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="outline" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">JobGenie</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-1">
      <aside
          className={cn(
            "sticky top-0 z-20 flex h-screen w-64 flex-col border-r bg-background transition-transform md:translate-x-0",
            sidebarOpen ? "translate-x-0 fixed" : "-translate-x-full fixed md:sticky",
          )}
      >
          <div className="flex h-16 items-center border-b px-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">JobGenie</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto md:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close Sidebar</span>
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
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                      router.pathname === item.href || router.pathname.startsWith(`${item.href}/`)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          <div className="border-t p-4">
            <Button variant="outline" className="w-full justify-start gap-2">
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
          </div>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
