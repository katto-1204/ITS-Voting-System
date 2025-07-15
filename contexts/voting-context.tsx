"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface Candidate {
  id: string
  name: string
  position: string
  bio: string
  photo: string
  platform: string
  votes?: number
}

interface Position {
  id: string
  title: string
  candidates: Candidate[]
  allowAbstain: boolean
}

interface VotingContextType {
  positions: Position[]
  votingOpen: boolean
  votingEndTime: Date | null
  results: Record<string, number>
  submitVote: (votes: Record<string, string>) => Promise<boolean>
  toggleVoting: () => void
  addCandidate: (candidate: Omit<Candidate, "id">) => void
  removeCandidate: (candidateId: string) => void
}

const VotingContext = createContext<VotingContextType | undefined>(undefined)

const mockPositions: Position[] = [
  {
    id: "president",
    title: "President",
    allowAbstain: true,
    candidates: [
      {
        id: "p1",
        name: "Sarah Johnson",
        position: "president",
        bio: "Senior Computer Science major with 3 years of student government experience.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Improving campus facilities and student services",
        votes: 0,
      },
      {
        id: "p2",
        name: "Michael Chen",
        position: "president",
        bio: "Business Administration student focused on financial transparency.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Budget transparency and academic support programs",
        votes: 0,
      },
    ],
  },
  {
    id: "external-vp",
    title: "External Vice President",
    allowAbstain: true,
    candidates: [
      {
        id: "evp1",
        name: "Emily Rodriguez",
        position: "external-vp",
        bio: "Psychology major with leadership experience in multiple organizations.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Building stronger community partnerships",
        votes: 0,
      },
      {
        id: "evp2",
        name: "Carlos Martinez",
        position: "external-vp",
        bio: "Communications student with extensive networking experience.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Expanding external relations and partnerships",
        votes: 0,
      },
    ],
  },
  {
    id: "internal-vp",
    title: "Internal Vice President",
    allowAbstain: true,
    candidates: [
      {
        id: "ivp1",
        name: "David Kim",
        position: "internal-vp",
        bio: "Engineering student passionate about internal organization.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Streamlining internal processes and communication",
        votes: 0,
      },
      {
        id: "ivp2",
        name: "Rachel Thompson",
        position: "internal-vp",
        bio: "Management student with organizational leadership skills.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Enhancing internal coordination and efficiency",
        votes: 0,
      },
    ],
  },
  {
    id: "secretary",
    title: "Secretary",
    allowAbstain: true,
    candidates: [
      {
        id: "sec1",
        name: "Maria Santos",
        position: "secretary",
        bio: "Communications major with excellent organizational skills.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Transparent documentation and communication",
        votes: 0,
      },
      {
        id: "sec2",
        name: "Andrew Lee",
        position: "secretary",
        bio: "English major with strong writing and documentation skills.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Clear and accessible record keeping",
        votes: 0,
      },
    ],
  },
  {
    id: "asst-secretary",
    title: "Assistant Secretary",
    allowAbstain: true,
    candidates: [
      {
        id: "asec1",
        name: "James Wilson",
        position: "asst-secretary",
        bio: "Business student with strong administrative background.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Supporting efficient record keeping",
        votes: 0,
      },
      {
        id: "asec2",
        name: "Nicole Davis",
        position: "asst-secretary",
        bio: "Information Systems student with organizational expertise.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Digital documentation and organization",
        votes: 0,
      },
    ],
  },
  {
    id: "treasurer",
    title: "Treasurer",
    allowAbstain: true,
    candidates: [
      {
        id: "tres1",
        name: "Lisa Chang",
        position: "treasurer",
        bio: "Accounting major with financial management experience.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Responsible financial stewardship",
        votes: 0,
      },
      {
        id: "tres2",
        name: "Mark Rodriguez",
        position: "treasurer",
        bio: "Finance student with budget planning expertise.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Strategic financial planning and transparency",
        votes: 0,
      },
    ],
  },
  {
    id: "asst-treasurer",
    title: "Assistant Treasurer",
    allowAbstain: true,
    candidates: [
      {
        id: "atres1",
        name: "Robert Garcia",
        position: "asst-treasurer",
        bio: "Finance student passionate about budget management.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Supporting transparent financial operations",
        votes: 0,
      },
      {
        id: "atres2",
        name: "Jessica Wang",
        position: "asst-treasurer",
        bio: "Economics student with analytical financial skills.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Data-driven financial assistance",
        votes: 0,
      },
    ],
  },
  {
    id: "auditor",
    title: "Auditor",
    allowAbstain: true,
    candidates: [
      {
        id: "aud1",
        name: "Jennifer Lee",
        position: "auditor",
        bio: "Accounting major with audit and compliance experience.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Ensuring financial accountability",
        votes: 0,
      },
      {
        id: "aud2",
        name: "Thomas Brown",
        position: "auditor",
        bio: "Business student with risk management focus.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Comprehensive financial oversight",
        votes: 0,
      },
    ],
  },
  {
    id: "asst-auditor",
    title: "Assistant Auditor",
    allowAbstain: true,
    candidates: [
      {
        id: "aaud1",
        name: "Kevin Brown",
        position: "asst-auditor",
        bio: "Business student with analytical skills.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Supporting thorough financial review",
        votes: 0,
      },
      {
        id: "aaud2",
        name: "Stephanie Miller",
        position: "asst-auditor",
        bio: "Accounting student with attention to detail.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Meticulous financial verification",
        votes: 0,
      },
    ],
  },
  {
    id: "asst-business-manager",
    title: "Assistant Business Manager",
    allowAbstain: true,
    candidates: [
      {
        id: "abm1",
        name: "Amanda Taylor",
        position: "asst-business-manager",
        bio: "Management student with business operations experience.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Streamlining business operations",
        votes: 0,
      },
      {
        id: "abm2",
        name: "Christopher Jones",
        position: "asst-business-manager",
        bio: "Business Administration student with process improvement focus.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Optimizing organizational efficiency",
        votes: 0,
      },
    ],
  },
  {
    id: "pio",
    title: "Public Information Officer (P.I.O)",
    allowAbstain: true,
    candidates: [
      {
        id: "pio1",
        name: "Daniel Martinez",
        position: "pio",
        bio: "Communications major with media and PR experience.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Enhancing public communication and transparency",
        votes: 0,
      },
      {
        id: "pio2",
        name: "Samantha Green",
        position: "pio",
        bio: "Journalism student with digital media expertise.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Modern communication and social media engagement",
        votes: 0,
      },
    ],
  },
  {
    id: "1st-year-rep",
    title: "1st Year Representative",
    allowAbstain: true,
    candidates: [
      {
        id: "1yr1",
        name: "Alex Johnson",
        position: "1st-year-rep",
        bio: "First-year student passionate about representing new students.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Advocating for first-year student needs",
        votes: 0,
      },
      {
        id: "1yr2",
        name: "Maya Patel",
        position: "1st-year-rep",
        bio: "First-year student with high school leadership experience.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Smooth transition and integration for new students",
        votes: 0,
      },
    ],
  },
  {
    id: "2nd-year-rep",
    title: "2nd Year Representative",
    allowAbstain: true,
    candidates: [
      {
        id: "2yr1",
        name: "Sophia Davis",
        position: "2nd-year-rep",
        bio: "Second-year student with leadership experience.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Bridging the gap between underclassmen and upperclassmen",
        votes: 0,
      },
      {
        id: "2yr2",
        name: "Ethan Wilson",
        position: "2nd-year-rep",
        bio: "Second-year student focused on academic support.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Academic resources and peer mentoring",
        votes: 0,
      },
    ],
  },
  {
    id: "3rd-year-rep",
    title: "3rd Year Representative",
    allowAbstain: true,
    candidates: [
      {
        id: "3yr1",
        name: "Marcus Thompson",
        position: "3rd-year-rep",
        bio: "Third-year student focused on academic excellence.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Supporting academic and career development",
        votes: 0,
      },
      {
        id: "3yr2",
        name: "Olivia Anderson",
        position: "3rd-year-rep",
        bio: "Third-year student with internship and career focus.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Career preparation and professional development",
        votes: 0,
      },
    ],
  },
  {
    id: "4th-year-rep",
    title: "4th Year Representative",
    allowAbstain: true,
    candidates: [
      {
        id: "4yr1",
        name: "Isabella Rodriguez",
        position: "4th-year-rep",
        bio: "Senior student with extensive campus involvement.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Preparing students for post-graduation success",
        votes: 0,
      },
      {
        id: "4yr2",
        name: "Nathan Clark",
        position: "4th-year-rep",
        bio: "Senior student with alumni network connections.",
        photo: "/placeholder.svg?height=200&width=200",
        platform: "Building bridges to alumni and career opportunities",
        votes: 0,
      },
    ],
  },
]

export function VotingProvider({ children }: { children: React.ReactNode }) {
  const [positions, setPositions] = useState<Position[]>(mockPositions)
  const [votingOpen, setVotingOpen] = useState(true)
  const [votingEndTime, setVotingEndTime] = useState<Date | null>(
    new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
  )
  const [results, setResults] = useState<Record<string, number>>({})

  const submitVote = async (votes: Record<string, string>): Promise<boolean> => {
    // Mock vote submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update vote counts
    const newResults = { ...results }
    Object.values(votes).forEach((candidateId) => {
      if (candidateId !== "abstain") {
        newResults[candidateId] = (newResults[candidateId] || 0) + 1
      } else {
        // Track abstain votes separately if needed
        newResults["abstain"] = (newResults["abstain"] || 0) + 1
      }
    })
    setResults(newResults)

    return true
  }

  const toggleVoting = () => {
    setVotingOpen(!votingOpen)
  }

  const addCandidate = (candidate: Omit<Candidate, "id">) => {
    const newCandidate: Candidate = {
      ...candidate,
      id: `candidate-${Date.now()}`,
      votes: 0,
    }

    setPositions((prev) =>
      prev.map((position) =>
        position.id === candidate.position
          ? { ...position, candidates: [...position.candidates, newCandidate] }
          : position,
      ),
    )
  }

  const removeCandidate = (candidateId: string) => {
    setPositions((prev) =>
      prev.map((position) => ({
        ...position,
        candidates: position.candidates.filter((c) => c.id !== candidateId),
      })),
    )
  }

  return (
    <VotingContext.Provider
      value={{
        positions,
        votingOpen,
        votingEndTime,
        results,
        submitVote,
        toggleVoting,
        addCandidate,
        removeCandidate,
      }}
    >
      {children}
    </VotingContext.Provider>
  )
}

export function useVoting() {
  const context = useContext(VotingContext)
  if (context === undefined) {
    throw new Error("useVoting must be used within a VotingProvider")
  }
  return context
}
