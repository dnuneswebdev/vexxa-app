"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/auth/login")
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-md"
        >
          Sair
        </button>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Bem-vindo!</h2>
        <p className="text-muted-foreground mb-4">
          Você está conectado com o email: <span className="font-medium">{session?.user?.email}</span>
        </p>
        <p className="text-muted-foreground">
          Access Token: <span className="font-mono text-xs bg-muted p-1 rounded">{session?.accessToken?.substring(0, 10)}...</span>
        </p>
      </div>
    </div>
  )
}
