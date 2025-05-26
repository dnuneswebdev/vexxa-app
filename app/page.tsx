"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { status } = useSession()

  useEffect(() => {
    // If authenticated, redirect to dashboard
    if (status === "authenticated") {
      redirect("/dashboard")
    }
    // If not authenticated, redirect to login
    else if (status === "unauthenticated") {
      redirect("/auth/login")
    }
  }, [status])

  // Show loading state while checking authentication
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
}
