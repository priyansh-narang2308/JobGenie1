"use client"

import { useRouter } from "next/router"
import { type ReactNode, useState } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import {
  BriefcaseBusiness,
  FileText,
  Gauge,
  GraduationCap,
  LogOut,
  Menu,
  Globe,
  MessageSquare,
  Settings,
  Sparkles,
  User,
  Speech,
  X,
  Sun,
  Moon,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import GoogleTranslate from "../google-translate"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const mainNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: Gauge },
    { name: "Jobs", href: "/jobs", icon: BriefcaseBusiness },
    { name: "Resume Tools", href: "/resume-tools", icon: FileText },
    { name: "Interviews", href: "/interviews", icon: Speech },
    { name: "Career Guidance", href: "/career-guidance", icon: MessageSquare },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen">
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
            {/* Theme and Language Controls */}
            <div className="mb-4 flex items-center justify-start gap-2 px-3">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-9 w-9 items-center justify-center rounded-md border bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <div className="flex h-9 w-9 items-center justify-center rounded-md border bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground">
                  
                <GoogleTranslate />
              </div>
            </div>

            <div className="space-y-1">
              {mainNavigation.map((item) => (
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
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-30 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  )
}
