"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  studentId?: string
  name: string
  role: "student" | "admin"
  hasVoted?: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, studentId?: string) => Promise<boolean>
  logout: () => void
  loading: boolean
  markAsVoted: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Function to generate a realistic name from email
const generateNameFromEmail = (email: string): string => {
  const firstNames = [
    "John",
    "Jane",
    "Michael",
    "Sarah",
    "David",
    "Emily",
    "James",
    "Maria",
    "Robert",
    "Lisa",
    "Kevin",
    "Amanda",
    "Daniel",
    "Jennifer",
    "Alex",
    "Sophia",
    "Marcus",
    "Isabella",
    "Ryan",
    "Emma",
  ]
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
  ]

  const emailPart = email.split("@")[0]
  const hash = emailPart.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

  const firstIndex = Math.abs(hash) % firstNames.length
  const lastIndex = Math.abs(hash >> 8) % lastNames.length

  return `${firstNames[firstIndex]} ${lastNames[lastIndex]}`
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string, studentId?: string): Promise<boolean> => {
    setLoading(true)

    // Mock authentication - replace with real API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === "admin@school.edu" && password === "admin123") {
      const adminUser: User = {
        id: "admin-1",
        email,
        name: "System Administrator",
        role: "admin",
      }
      setUser(adminUser)
      localStorage.setItem("user", JSON.stringify(adminUser))
      setLoading(false)
      return true
    } else if (email && password && studentId) {
      const studentUser: User = {
        id: `student-${studentId}`,
        email,
        studentId,
        name: generateNameFromEmail(email), // Generate realistic name from email
        role: "student",
        hasVoted: false,
      }
      setUser(studentUser)
      localStorage.setItem("user", JSON.stringify(studentUser))
      setLoading(false)
      return true
    }

    setLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  // Add function to update voting status
  const markAsVoted = () => {
    if (user) {
      const updatedUser = { ...user, hasVoted: true }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, loading, markAsVoted }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
