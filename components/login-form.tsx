"use client"

import React, { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Vote, Shield } from "lucide-react"

export function LoginForm() {
  const { login } = useAuth()
  const { toast } = useToast()

  const [studentEmail, setStudentEmail] = useState("")
  const [studentPassword, setStudentPassword] = useState("")
  const [studentId, setStudentId] = useState("")

  const [adminEmail, setAdminEmail] = useState("")
  const [adminPassword, setAdminPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const success = await login(studentEmail, studentPassword, studentId)

    if (success) {
      toast({
        title: "Login Successful",
        description: "Welcome to the voting system!",
      })
    } else {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const success = await login(adminEmail, adminPassword)

    if (success) {
      toast({
        title: "Admin Login Successful",
        description: "Welcome to the admin panel!",
      })
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid admin credentials.",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center mobile-padding py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Vote className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
            <h1 className="mobile-heading font-bold text-white">ITS Election 2025</h1>
          </div>
          <p className="text-white/80 mobile-text">Secure online voting platform</p>
        </div>

        {/* Card */}
        <Card className="backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl">
          <CardHeader className="mobile-card">
            <CardTitle className="text-white text-lg sm:text-xl">Login to Vote</CardTitle>
            <CardDescription className="text-white/70 mobile-text">Choose your login type below</CardDescription>
          </CardHeader>
          <CardContent className="mobile-card">
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-black/20 h-10 sm:h-11">
                <TabsTrigger value="student" className="data-[state=active]:bg-red-600 text-xs sm:text-sm">
                  <Vote className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="admin" className="data-[state=active]:bg-red-600 text-xs sm:text-sm">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Admin
                </TabsTrigger>
              </TabsList>

              {/* Student Form */}
              <TabsContent value="student" className="mt-4 sm:mt-6">
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email" className="text-white mobile-text">Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="your.email@school.edu"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-10 sm:h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="student-id" className="text-white mobile-text">Student ID</Label>
                    <Input
                      id="student-id"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="2024001234"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-10 sm:h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="student-password" className="text-white mobile-text">Password</Label>
                    <Input
                      id="student-password"
                      type="password"
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-10 sm:h-11"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 h-10 sm:h-11"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login as Student"}
                  </Button>
                </form>
              </TabsContent>

              {/* Admin Form */}
              <TabsContent value="admin" className="mt-4 sm:mt-6">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email" className="text-white mobile-text">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="admin@school.edu"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-10 sm:h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-password" className="text-white mobile-text">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-10 sm:h-11"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 h-10 sm:h-11"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login as Admin"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Demo Credentials */}
            <div className="mt-6 text-center text-xs sm:text-sm text-white/60 space-y-1">
              <p>Demo Credentials:</p>
              <p>Student: any email + password + student ID</p>
              <p>Admin: <code>admin@school.edu</code> + password</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
