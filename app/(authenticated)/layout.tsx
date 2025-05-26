"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { useTheme } from "next-themes"
// Import the Sidebar component directly to fix the module import error
import { Sidebar } from "@/app/(authenticated)/components/Sidebar"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const { setTheme } = useTheme()
  
  // Restore user's previous theme preference after login
  useEffect(() => {
    const previousTheme = localStorage.getItem('vexxa-previous-theme')
    if (previousTheme) {
      setTheme(previousTheme)
      // Clear the stored theme after restoring it
      localStorage.removeItem('vexxa-previous-theme')
    }
  }, [setTheme])

  // If the user is not authenticated, redirect to login
  if (status === "unauthenticated") {
    redirect("/auth/login")
  }

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar user={session?.user} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  )
}
