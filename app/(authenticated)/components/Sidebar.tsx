"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { ChevronDown, LayoutDashboard, FileText, LogOut, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type User = {
  email?: string | null
  name?: string | null
  image?: string | null
}

type SidebarProps = {
  user: User | undefined
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      name: "Orçamentos",
      href: "/proposals",
      icon: <FileText className="h-5 w-5" />
    },
  ]

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/auth/login" })
  }

  return (
    <aside className="w-64 border-r border-border h-screen flex flex-col bg-card">
      {/* Logo */}
      <div className="p-6">
        <Image
          src="/images/vexxa-horizontal-transparent.png"
          alt="Vexxa Logo"
          width={150}
          height={40}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={`justify-start w-full ${isActive 
                ? "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
              <Link href={item.href}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </Button>
          )
        })}
      </nav>

      {/* User profile dropdown at the bottom */}
      <div className="border-t border-border p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center justify-between w-full h-auto p-2">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {user?.name?.[0] || user?.email?.[0] || "U"}
                </div>
                <span className="text-sm truncate max-w-[120px]">{user?.email || "User"}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={toggleTheme}>
              {theme === "dark" ? (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Tema Claro</span>
                </>
              ) : (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Tema Escuro</span>
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
