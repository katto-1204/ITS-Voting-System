"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface VotingTimerProps {
  endTime: Date | null
}

export function VotingTimer({ endTime }: VotingTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>("")

  useEffect(() => {
    if (!endTime) return

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endTime.getTime() - now

      if (distance < 0) {
        setTimeLeft("Voting Ended")
        clearInterval(timer)
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-2">
        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
        <span className="text-xs sm:text-sm font-medium text-white/80">Voting Ends In</span>
      </div>
      <div className="text-lg sm:text-2xl font-bold text-white">{timeLeft}</div>
    </>
  )
}
