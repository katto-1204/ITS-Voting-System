"use client"

import { useVoting } from "@/contexts/voting-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BarChart3, Trophy, Users } from "lucide-react"
import Image from "next/image"

interface ResultsPageProps {
  onBack: () => void
}

export function ResultsPage({ onBack }: ResultsPageProps) {
  const { positions, results, votingOpen } = useVoting()

  const getVoteCount = (candidateId: string) => results[candidateId] || 0

  const getPositionResults = (positionId: string) => {
    const position = positions.find((p) => p.id === positionId)
    if (!position) return []

    const candidatesWithVotes = position.candidates.map((candidate) => ({
      ...candidate,
      votes: getVoteCount(candidate.id),
    }))

    const totalVotes = candidatesWithVotes.reduce((sum, c) => sum + c.votes, 0)

    return candidatesWithVotes
      .map((candidate) => ({
        ...candidate,
        percentage: totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0,
      }))
      .sort((a, b) => b.votes - a.votes)
  }

  if (votingOpen) {
    return (
      <div className="min-h-screen mobile-padding py-4 sm:py-6">
        <div className="max-w-2xl mx-auto">
          <Card className="backdrop-blur-xl bg-white/15 border border-white/30 shadow-2xl">
            <CardContent className="text-center py-12 sm:py-16 mobile-card">
              <BarChart3 className="h-16 w-16 sm:h-24 sm:w-24 text-yellow-400 mx-auto mb-4 sm:mb-6" />
              <h1 className="mobile-heading font-bold text-white mb-3 sm:mb-4">Results Not Available</h1>
              <p className="text-white/70 mb-6 sm:mb-8 mobile-text">
                Results will be available after the voting period ends.
              </p>
              <Button onClick={onBack} className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen mobile-padding py-4 sm:py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass rounded-xl mobile-card mb-4 sm:mb-6">
          <div className="mobile-flex items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <Button
                variant="outline"
                onClick={onBack}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-9 sm:h-10 px-3 sm:px-4"
                size="sm"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Back</span>
              </Button>
              <div className="flex-1 min-w-0">
                <h1 className="mobile-heading font-bold text-white">Election Results</h1>
                <p className="text-white/70 mobile-text">Live results from the student body election</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="flex items-center gap-1 sm:gap-2 text-white/70 justify-end">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Total Votes Cast</span>
              </div>
              <p className="text-white font-bold text-lg sm:text-xl">
                {Object.values(results).reduce((sum, votes) => sum + votes, 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4 sm:space-y-6">
          {positions.map((position) => {
            const positionResults = getPositionResults(position.id)
            const winner = positionResults[0]

            return (
              <Card key={position.id} className="backdrop-blur-xl bg-white/15 border border-white/30 shadow-2xl">
                <CardHeader className="mobile-card">
                  <CardTitle className="text-white text-lg sm:text-xl flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                    {position.title}
                  </CardTitle>
                  <CardDescription className="text-white/70 mobile-text">
                    {winner && winner.votes > 0 ? (
                      <span className="flex items-center gap-2">
                        <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                        Winner: {winner.name} ({winner.votes} votes, {winner.percentage.toFixed(1)}%)
                      </span>
                    ) : (
                      "No votes recorded yet"
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mobile-card pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    {positionResults.map((candidate, index) => (
                      <div key={candidate.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                            <div className="relative flex-shrink-0">
                              <Image
                                src={candidate.photo || "/placeholder.svg"}
                                alt={candidate.name}
                                width={40}
                                height={40}
                                className="rounded-full object-cover w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                              />
                              {index === 0 && candidate.votes > 0 && (
                                <Trophy className="absolute -top-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-white text-sm sm:text-base truncate">
                                {candidate.name}
                              </h3>
                              <p className="text-white/60 text-xs sm:text-sm">
                                {candidate.votes} votes ({candidate.percentage.toFixed(1)}%)
                              </p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-white font-bold text-sm sm:text-lg">{candidate.votes}</span>
                          </div>
                        </div>
                        <Progress value={candidate.percentage} className="h-1.5 sm:h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Summary */}
        <Card className="backdrop-blur-xl bg-white/15 border border-white/30 shadow-2xl mt-4 sm:mt-6">
          <CardHeader className="mobile-card">
            <CardTitle className="text-white text-lg sm:text-xl">Election Summary</CardTitle>
          </CardHeader>
          <CardContent className="mobile-card pt-0">
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-white mb-1">{positions.length}</div>
                <div className="text-white/70 text-xs sm:text-sm">Positions</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-white mb-1">
                  {positions.reduce((sum, p) => sum + p.candidates.length, 0)}
                </div>
                <div className="text-white/70 text-xs sm:text-sm">Candidates</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-white mb-1">
                  {Object.values(results).reduce((sum, votes) => sum + votes, 0)}
                </div>
                <div className="text-white/70 text-xs sm:text-sm">Total Votes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
