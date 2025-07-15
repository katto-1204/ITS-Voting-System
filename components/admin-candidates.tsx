"use client"

import { useState } from "react"
import { useVoting } from "@/contexts/voting-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Plus, Edit, Trash2, User } from "lucide-react"
import Image from "next/image"

interface AdminCandidatesProps {
  onBack: () => void
}

export function AdminCandidates({ onBack }: AdminCandidatesProps) {
  const { positions, addCandidate, removeCandidate } = useVoting()
  const { toast } = useToast()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    position: "",
    bio: "",
    platform: "",
    photo: "/placeholder.svg?height=200&width=200",
  })

  const handleAddCandidate = () => {
    if (!newCandidate.name || !newCandidate.position || !newCandidate.bio) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    addCandidate(newCandidate)
    setNewCandidate({
      name: "",
      position: "",
      bio: "",
      platform: "",
      photo: "/placeholder.svg?height=200&width=200",
    })
    setShowAddDialog(false)
    toast({
      title: "Candidate Added",
      description: `${newCandidate.name} has been added successfully.`,
    })
  }

  const handleRemoveCandidate = (candidateId: string, candidateName: string) => {
    removeCandidate(candidateId)
    toast({
      title: "Candidate Removed",
      description: `${candidateName} has been removed from the election.`,
    })
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
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
                <h1 className="text-2xl font-bold text-white">Manage Candidates</h1>
                <p className="text-white/70">Add, edit, or remove election candidates</p>
              </div>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Candidate
                </Button>
              </DialogTrigger>
              <DialogContent className="backdrop-blur-xl bg-red-950/50 border border-red-500/50 shadow-2xl max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-white">Add New Candidate</DialogTitle>
                  <DialogDescription className="text-white/70">
                    Enter the candidate's information below.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newCandidate.name}
                      onChange={(e) => setNewCandidate((prev) => ({ ...prev, name: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Enter candidate name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-white">
                      Position
                    </Label>
                    <Select
                      value={newCandidate.position}
                      onValueChange={(value) => setNewCandidate((prev) => ({ ...prev, position: value }))}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((position) => (
                          <SelectItem key={position.id} value={position.id}>
                            {position.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-white">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={newCandidate.bio}
                      onChange={(e) => setNewCandidate((prev) => ({ ...prev, bio: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Enter candidate bio"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platform" className="text-white">
                      Platform
                    </Label>
                    <Textarea
                      id="platform"
                      value={newCandidate.platform}
                      onChange={(e) => setNewCandidate((prev) => ({ ...prev, platform: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Enter candidate platform"
                      rows={2}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddDialog(false)}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddCandidate} className="bg-red-600 hover:bg-red-700">
                    Add Candidate
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Candidates by Position */}
        <div className="space-y-6">
          {positions.map((position) => (
            <Card key={position.id} className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-xl">{position.title}</CardTitle>
                <CardDescription className="text-white/70">
                  {position.candidates.length} candidate(s) running for this position
                </CardDescription>
              </CardHeader>
              <CardContent>
                {position.candidates.length === 0 ? (
                  <div className="text-center py-8">
                    <User className="h-12 w-12 text-white/30 mx-auto mb-4" />
                    <p className="text-white/70">No candidates for this position yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {position.candidates.map((candidate) => (
                      <Card
                        key={candidate.id}
                        className="backdrop-blur-lg bg-white/15 border border-white/30 shadow-xl"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Image
                              src={candidate.photo || "/placeholder.svg"}
                              alt={candidate.name}
                              width={60}
                              height={60}
                              className="rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-white text-lg mb-1">{candidate.name}</h3>
                              <p className="text-white/70 text-sm mb-2 line-clamp-2">{candidate.bio}</p>
                              <p className="text-white/60 text-xs line-clamp-1">{candidate.platform}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex-1"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRemoveCandidate(candidate.id, candidate.name)}
                              className="bg-red-600/20 border-red-500/30 text-red-400 hover:bg-red-600/30"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
