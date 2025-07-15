"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useVoting } from "@/contexts/voting-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Vote, CheckCircle, X } from "lucide-react"
import Image from "next/image"

interface VotePageProps {
  onBack: () => void
}

export function VotePage({ onBack }: VotePageProps) {
  const { user, markAsVoted } = useAuth()
  const { positions, submitVote } = useVoting()
  const { toast } = useToast()
  const [votes, setVotes] = useState<Record<string, string>>({})
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleVoteChange = (positionId: string, candidateId: string) => {
    setVotes((prev) => ({
      ...prev,
      [positionId]: candidateId,
    }))
  }

  const handleSubmit = () => {
    // Check if all positions have votes (including abstain)
    const missingVotes = positions.filter((position) => !votes[position.id])
    if (missingVotes.length > 0) {
      toast({
        title: "Incomplete Ballot",
        description: `Please make a selection for: ${missingVotes.map((p) => p.title).join(", ")}`,
        variant: "destructive",
      })
      return
    }

    setShowConfirmDialog(true)
  }

  const confirmSubmit = async () => {
    setSubmitting(true)
    const success = await submitVote(votes)

    if (success) {
      // Mark user as voted and block further voting
      markAsVoted()
      setSubmitted(true)
      toast({
        title: "Vote Submitted Successfully",
        description: "Thank you for participating in the ITS Election 2025!",
      })
    } else {
      toast({
        title: "Submission Failed",
        description: "Please try again.",
        variant: "destructive",
      })
    }

    setSubmitting(false)
    setShowConfirmDialog(false)
  }

  // Check if user has already voted
  if (user?.hasVoted || submitted) {
    return (
      <div className="min-h-screen mobile-padding py-4 sm:py-6 bg-gradient-to-br from-black via-gray-900 to-red-950">
        <div className="max-w-2xl mx-auto">
          <Card className="backdrop-blur-xl bg-white/15 border border-white/30 shadow-2xl">
            <CardContent className="text-center py-12 sm:py-16 mobile-card">
              <CheckCircle className="h-16 w-16 sm:h-24 sm:w-24 text-green-400 mx-auto mb-4 sm:mb-6" />
              <h1 className="mobile-heading font-bold text-white mb-3 sm:mb-4">Thank You for Voting!</h1>
              <p className="text-white/70 mb-6 sm:mb-8 mobile-text">
                Your vote has been successfully recorded for the ITS Election 2025. You cannot vote again.
              </p>
              <Button onClick={onBack} className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen mobile-padding py-4 sm:py-6">
      <div className="max-w-4xl mx-auto">
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
                <h1 className="mobile-heading font-bold text-white truncate">Cast Your Vote</h1>
                <p className="text-white/70 mobile-text">Select one candidate per position or abstain</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-white/70 text-xs sm:text-sm">Voting as:</p>
              <p className="text-white font-medium text-xs sm:text-sm truncate max-w-32 sm:max-w-none">{user?.name}</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-4 sm:mb-6">
          <div className="glass rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between text-white/70 text-xs sm:text-sm">
              <span>
                Progress: {Object.keys(votes).length} of {positions.length} positions
              </span>
              <span>{Math.round((Object.keys(votes).length / positions.length) * 100)}% complete</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-1.5 sm:h-2 mt-2">
              <div
                className="bg-red-600 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                style={{ width: `${(Object.keys(votes).length / positions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Voting Form */}
        <div className="space-y-4 sm:space-y-6">
          {positions.map((position, index) => (
            <Card key={position.id} className="backdrop-blur-xl bg-white/15 border border-white/30 shadow-2xl">
              <CardHeader className="mobile-card">
                <CardTitle className="text-white text-lg sm:text-xl flex items-center gap-2">
                  <span className="bg-red-600 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-xs sm:text-sm font-bold">
                    {index + 1}
                  </span>
                  {position.title}
                </CardTitle>
                <CardDescription className="text-white/70 mobile-text">
                  Select one candidate for this position or choose to abstain
                </CardDescription>
              </CardHeader>
              <CardContent className="mobile-card pt-0">
                <RadioGroup
                  value={votes[position.id] || ""}
                  onValueChange={(value) => handleVoteChange(position.id, value)}
                >
                  <div className="space-y-3 sm:space-y-4">
                    {/* Candidates */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                      {position.candidates.map((candidate) => (
                        <div key={candidate.id} className="relative">
                          <RadioGroupItem value={candidate.id} id={candidate.id} className="peer sr-only" />
                          <Label
                            htmlFor={candidate.id}
                            className="flex flex-col p-3 sm:p-4 rounded-lg border-2 border-white/30 cursor-pointer hover:border-red-400 peer-checked:border-red-500 peer-checked:bg-red-500/20 transition-all backdrop-blur-lg bg-white/10"
                          >
                            <div className="flex items-start gap-3 sm:gap-4">
                              <Image
                                src={candidate.photo || "/placeholder.svg"}
                                alt={candidate.name}
                                width={60}
                                height={60}
                                className="rounded-full object-cover w-12 h-12 sm:w-15 sm:h-15 lg:w-20 lg:h-20 flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-white text-sm sm:text-base lg:text-lg mb-1 truncate">
                                  {candidate.name}
                                </h3>
                                <p className="text-white/70 text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2">
                                  {candidate.bio}
                                </p>
                                <p className="text-white/60 text-xs line-clamp-1">Platform: {candidate.platform}</p>
                              </div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>

                    {/* Abstain Option */}
                    {position.allowAbstain && (
                      <div className="relative">
                        <RadioGroupItem value="abstain" id={`abstain-${position.id}`} className="peer sr-only" />
                        <Label
                          htmlFor={`abstain-${position.id}`}
                          className="flex items-center justify-center p-3 sm:p-4 rounded-lg border-2 border-white/30 cursor-pointer hover:border-yellow-400 peer-checked:border-yellow-500 peer-checked:bg-yellow-500/20 transition-all backdrop-blur-lg bg-white/10"
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <X className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                            <span className="text-white font-medium text-sm sm:text-base">
                              Abstain from voting for this position
                            </span>
                          </div>
                        </Label>
                      </div>
                    )}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          ))}

          {/* Submit Button */}
          <div className="text-center pb-4">
            <Button
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white px-8 sm:px-12 py-2 sm:py-3 text-base sm:text-lg w-full sm:w-auto"
              disabled={Object.keys(votes).length !== positions.length}
            >
              <Vote className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Submit Vote ({Object.keys(votes).length}/{positions.length})
            </Button>
          </div>
        </div>

        {/* Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="backdrop-blur-xl bg-white/15 border border-white/30 shadow-2xl mx-4 sm:mx-auto max-w-md sm:max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-lg sm:text-xl">Confirm Your Vote</DialogTitle>
              <DialogDescription className="text-white/70 mobile-text">
                Please review your selections. Once submitted, your vote cannot be changed.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2 sm:space-y-3 max-h-60 overflow-y-auto">
              {positions.map((position) => {
                const selectedCandidate = position.candidates.find((c) => c.id === votes[position.id])
                const isAbstain = votes[position.id] === "abstain"
                return (
                  <div key={position.id} className="flex justify-between items-start gap-4 text-xs sm:text-sm">
                    <span className="text-white font-medium flex-shrink-0">{position.title}:</span>
                    <span className={`text-right ${isAbstain ? "text-yellow-400" : "text-white/70"}`}>
                      {isAbstain ? "Abstain" : selectedCandidate?.name}
                    </span>
                  </div>
                )
              })}
            </div>

            <DialogFooter className="mobile-flex gap-2 sm:gap-4">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex-1 sm:flex-none"
              >
                Review Again
              </Button>
              <Button
                onClick={confirmSubmit}
                disabled={submitting}
                className="bg-red-600 hover:bg-red-700 flex-1 sm:flex-none"
              >
                {submitting ? "Submitting..." : "Confirm Vote"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
