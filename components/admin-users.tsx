"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Search, Download, UserCheck, UserX, Mail } from "lucide-react"

interface AdminUsersProps {
  onBack: () => void
}

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@school.edu",
    studentId: "2024001",
    hasVoted: true,
    votedAt: "2024-01-15 10:30 AM",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@school.edu",
    studentId: "2024002",
    hasVoted: true,
    votedAt: "2024-01-15 11:15 AM",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@school.edu",
    studentId: "2024003",
    hasVoted: false,
    votedAt: null,
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@school.edu",
    studentId: "2024004",
    hasVoted: true,
    votedAt: "2024-01-15 09:45 AM",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@school.edu",
    studentId: "2024005",
    hasVoted: false,
    votedAt: null,
  },
]

export function AdminUsers({ onBack }: AdminUsersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "voted" | "not-voted">("all")

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.studentId.includes(searchTerm)

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "voted" && user.hasVoted) ||
      (filterStatus === "not-voted" && !user.hasVoted)

    return matchesSearch && matchesFilter
  })

  const votedCount = mockUsers.filter((u) => u.hasVoted).length
  const notVotedCount = mockUsers.length - votedCount

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-xl bg-red-950/50 border border-red-500/50 rounded-xl p-6 mb-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={onBack}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Manage Users</h1>
                <p className="text-white/70">View and manage student voter accounts</p>
              </div>
            </div>
            <Button className="bg-red-600 hover:bg-red-700">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockUsers.length}</div>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white">Voted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{votedCount}</div>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white">Not Voted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{notVotedCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Filter Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Search by name, email, or student ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  className={
                    filterStatus === "all"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  }
                >
                  All ({mockUsers.length})
                </Button>
                <Button
                  variant={filterStatus === "voted" ? "default" : "outline"}
                  onClick={() => setFilterStatus("voted")}
                  className={
                    filterStatus === "voted"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  }
                >
                  Voted ({votedCount})
                </Button>
                <Button
                  variant={filterStatus === "not-voted" ? "default" : "outline"}
                  onClick={() => setFilterStatus("not-voted")}
                  className={
                    filterStatus === "not-voted"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  }
                >
                  Not Voted ({notVotedCount})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Student List</CardTitle>
            <CardDescription className="text-white/70">
              Showing {filteredUsers.length} of {mockUsers.length} students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/20">
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-white">Student ID</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Voted At</TableHead>
                    <TableHead className="text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-white/10">
                      <TableCell className="text-white font-medium">{user.name}</TableCell>
                      <TableCell className="text-white/70">{user.email}</TableCell>
                      <TableCell className="text-white/70">{user.studentId}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.hasVoted ? "default" : "secondary"}
                          className={user.hasVoted ? "bg-green-600" : "bg-yellow-600"}
                        >
                          {user.hasVoted ? (
                            <>
                              <UserCheck className="h-3 w-3 mr-1" />
                              Voted
                            </>
                          ) : (
                            <>
                              <UserX className="h-3 w-3 mr-1" />
                              Not Voted
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white/70">{user.votedAt || "N/A"}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
