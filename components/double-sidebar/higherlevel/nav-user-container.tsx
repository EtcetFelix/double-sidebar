// app/(protected)/randotest/components/higherlevel/nav-user-container.tsx
"use client"

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { NavUser } from "./nav-user"

type UserData = {
  user_metadata?: {
    full_name?: string
    avatar_url?: string
    [key: string]: unknown
  }
  email?: string
  [key: string]: unknown
}

export function NavUserContainer() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createClient()
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error) {
          console.error("Error fetching user:", error)
          return
        }
        
        setUser(user as unknown as UserData)
      } catch (error) {
        console.error("Failed to fetch user:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchUser()
  }, [])
  
  if (loading || !user) return null
  
  return (
    <NavUser 
      user={{
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
        email: user.email || '',
        avatar: user.user_metadata?.avatar_url || ''
      }} 
    />
  )
} 