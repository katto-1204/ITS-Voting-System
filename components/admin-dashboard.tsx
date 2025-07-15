"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useVoting } from "@/contexts/voting-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminCandidates } from "@/components/admin-candidates"
import { AdminUsers } from "@/components/admin-users"
import { AdminSettings } from "@/components/admin-settings"
import { Users, Vote, Settings, BarChart3, LogOut, Play, Pause, UserCheck, Trophy } from "lucide-react"

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const { positions, votingOpen, toggleVoting, results } = useVoting()
  const [currentPage, setCurrentPage] = useState<"dashboard" | "candidates" | "users" | "settings">("dashboard")

  const totalCandidates = positions.reduce((sum, p) => sum + p.candidates.length, 0)
  const totalVotes = Object.values(results).reduce((sum, votes) => sum + votes, 0)
  const mockTotalUsers = 1250
  const mockVotedUsers = totalVotes

  if (currentPage === "candidates") {
    return <AdminCandidates onBack={() => setCurrentPage("dashboard")} />
  }

  if (currentPage === "users") {
    return <AdminUsers onBack={() => setCurrentPage("dashboard")} />
  }

  if (currentPage === "settings") {
    return <AdminSettings onBack={() => setCurrentPage("dashboard")} />
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-xl bg-red-950/50 border border-red-500/50 rounded-xl p-6 mb-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-white/70">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={toggleVoting}
                className={`${votingOpen ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
              >
                {votingOpen ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Close Voting
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Open Voting
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={logout}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Students</CardTitle>
              <Users className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockTotalUsers}</div>
              <p className="text-xs text-white/70">Registered voters</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Votes Cast</CardTitle>
              <Vote className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockVotedUsers}</div>
              <p className="text-xs text-white/70">{((mockVotedUsers / mockTotalUsers) * 100).toFixed(1)}% turnout</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Candidates</CardTitle>
              <Trophy className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalCandidates}</div>
              <p className="text-xs text-white/70">Across {positions.length} positions</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Voting Status</CardTitle>
              <BarChart3 className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge
                  variant={votingOpen ? "default" : "secondary"}
                  className={votingOpen ? "bg-green-600" : "bg-gray-600"}
                >
                  {votingOpen ? "Open" : "Closed"}
                </Badge>
              </div>
              <p className="text-xs text-white/70 mt-1">{votingOpen ? "Students can vote" : "Voting disabled"}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-white/70">Manage your election system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    onClick={() => setCurrentPage("candidates")}
                    className="bg-red-600 hover:bg-red-700 h-20 flex-col"
                  >
                    <Trophy className="h-6 w-6 mb-2" />
                    Manage Candidates
                  </Button>
                  <Button onClick={() => setCurrentPage("users")} className="bg-red-600 hover:bg-red-700 h-20 flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    Manage Users
                  </Button>
                  <Button
                    onClick={() => setCurrentPage("settings")}
                    className="bg-red-600 hover:bg-red-700 h-20 flex-col"
                  >
                    <Settings className="h-6 w-6 mb-2" />
                    Election Settings
                  </Button>
                  <Button
                    onClick={toggleVoting}
                    className={`h-20 flex-col ${
                      votingOpen ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {votingOpen ? (
                      <>
                        <Pause className="h-6 w-6 mb-2" />
                        Close Voting
                      </>
                    ) : (
                      <>
                        <Play className="h-6 w-6 mb-2" />
                        Open Voting
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-4 w-4 text-green-400" />
                    <span className="text-white/70 text-sm">Student john.doe@school.edu voted</span>
                    <span className="text-white/50 text-xs ml-auto">2 min ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-4 w-4 text-green-400" />
                    <span className="text-white/70 text-sm">Student jane.smith@school.edu voted</span>
                    <span className="text-white/50 text-xs ml-auto">5 min ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Settings className="h-4 w-4 text-blue-400" />
                    <span className="text-white/70 text-sm">Voting period extended by 1 hour</span>
                    <span className="text-white/50 text-xs ml-auto">1 hour ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Voting Progress */}
            <Card className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-lg">Voting Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/70">Turnout</span>
                    <span className="text-white">{((mockVotedUsers / mockTotalUsers) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: `${(mockVotedUsers / mockTotalUsers) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">{mockVotedUsers}</div>
                    <div className="text-xs text-white/70">Voted</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{mockTotalUsers - mockVotedUsers}</div>
                    <div className="text-xs text-white/70">Pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Database</span>
                  <Badge className="bg-green-600">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Authentication</span>
                  <Badge className="bg-green-600">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Voting System</span>
                  <Badge className={votingOpen ? "bg-green-600" : "bg-gray-600"}>
                    {votingOpen ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
