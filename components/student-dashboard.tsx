"use client"

import { useAuth } from "@/contexts/auth-context"
import { useVoting } from "@/contexts/voting-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VotingTimer } from "@/components/voting-timer"
import { VotePage } from "@/components/vote-page"
import { ResultsPage } from "@/components/results-page"
import { useState } from "react"
import { Vote, BarChart3, User, LogOut, CheckCircle, Clock } from "lucide-react"

export function StudentDashboard() {
  const { user, logout } = useAuth()
  const { votingOpen, votingEndTime, positions } = useVoting()
  const [currentPage, setCurrentPage] = useState<"dashboard" | "vote" | "results">("dashboard")

  if (currentPage === "vote") {
    return <VotePage onBack={() => setCurrentPage("dashboard")} />
  }

  if (currentPage === "results") {
    return <ResultsPage onBack={() => setCurrentPage("dashboard")} />
  }

  return (
    <div className="min-h-screen mobile-padding py-4 sm:py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass rounded-xl mobile-card mb-4 sm:mb-6">
          <div className="flex items-start sm:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="mobile-heading font-bold text-white mb-1 sm:mb-2 truncate">Welcome, {user?.name}</h1>
              <p className="text-white/70 mobile-text">Student ID: {user?.studentId}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 flex-shrink-0">
              <Button
                variant="outline"
                onClick={() => setCurrentPage("results")}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-9 sm:h-10"
                size="sm"
              >
                <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Profile</span>
              </Button>
              <Button
                variant="outline"
                onClick={logout}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-9 sm:h-10"
                size="sm"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Logout</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* Voting Status */}
            <Card className="backdrop-blur-xl bg-white/15 border border-white/30 shadow-2xl">
              <CardHeader className="mobile-card">
                <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
                  {user?.hasVoted ? (
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                  ) : (
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                  )}
                  Voting Status
                </CardTitle>
              </CardHeader>
              <CardContent className="mobile-card pt-0">
                {user?.hasVoted ? (
                  <div className="text-center py-6 sm:py-8">
                    <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-400 mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Thank You for Voting!</h3>
                    <p className="text-white/70 mobile-text">
                      Your vote has been successfully recorded and cannot be changed.
                    </p>
                  </div>
                ) : votingOpen ? (
                  <div className="text-center py-6 sm:py-8">
                    <Vote className="h-12 w-12 sm:h-16 sm:w-16 text-red-400 mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Ready to Vote</h3>
                    <p className="text-white/70 mobile-text mb-4 sm:mb-6">
                      Cast your vote for the ITS Election 2025. You can vote for candidates or abstain for each
                      position.
                    </p>
                    <Button
                      onClick={() => setCurrentPage("vote")}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg w-full sm:w-auto"
                    >
                      <Vote className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Cast Your Vote
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8">
                    <Clock className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Voting Closed</h3>
                    <p className="text-white/70 mobile-text">
                      The voting period has ended. Results will be available soon.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="backdrop-blur-xl bg-white/15 border border-white/30 shadow-2xl">
              <CardHeader className="mobile-card">
                <CardTitle className="text-white text-lg sm:text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="mobile-card pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage("results")}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-16 sm:h-20 flex-col"
                  >
                    <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
                    <span className="text-xs sm:text-sm">View Results</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage("vote")}
                    disabled={!votingOpen || user?.hasVoted}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-16 sm:h-20 flex-col disabled:opacity-50"
                  >
                    <Vote className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
                    <span className="text-xs sm:text-sm">{user?.hasVoted ? "Already Voted" : "Cast Vote"}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Timer */}
            {votingOpen && votingEndTime && !user?.hasVoted && (
              <div className="backdrop-blur-xl bg-white/15 border border-white/30 rounded-xl mobile-card text-center shadow-2xl">
                <VotingTimer endTime={votingEndTime} />
              </div>
            )}

            {/* Election Info */}
            <Card className="backdrop-blur-xl bg-white/15 border border-white/30 shadow-2xl">
              <CardHeader className="mobile-card">
                <CardTitle className="text-white text-base sm:text-lg">ITS Election 2025</CardTitle>
              </CardHeader>
              <CardContent className="mobile-card pt-0 space-y-3 sm:space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-1 mobile-text">Total Positions</h4>
                  <p className="text-xs sm:text-sm text-white/70">{positions.length} positions available</p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1 mobile-text">Voting Method</h4>
                  <p className="text-xs sm:text-sm text-white/70">Vote for candidates or abstain per position</p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1 mobile-text">Key Positions</h4>
                  <p className="text-xs sm:text-sm text-white/70">
                    President, Vice Presidents, Secretary, Treasurer, and more
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1 mobile-text">Results</h4>
                  <p className="text-xs sm:text-sm text-white/70">
                    {votingOpen ? "Available after voting ends" : "Available now"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
