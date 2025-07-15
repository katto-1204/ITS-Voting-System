"use client"

import { useState } from "react"
import { useVoting } from "@/contexts/voting-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Clock, Shield, Bell, Database } from "lucide-react"

interface AdminSettingsProps {
  onBack: () => void
}

export function AdminSettings({ onBack }: AdminSettingsProps) {
  const { votingOpen, toggleVoting } = useVoting()
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    votingStartDate: "2024-01-15",
    votingStartTime: "08:00",
    votingEndDate: "2024-01-16",
    votingEndTime: "18:00",
    allowResultsView: false,
    emailNotifications: true,
    requireStudentId: true,
    allowVoteChanges: false,
  })

  const handleSave = () => {
    toast("Settings Saved", {
      description: "Election settings have been updated successfully.",
    })
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
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
                <h1 className="text-2xl font-bold text-white">Election Settings</h1>
                <p className="text-white/70">Configure your election parameters</p>
              </div>
            </div>
            <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Voting Schedule */}
          <Card className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Voting Schedule
              </CardTitle>
              <CardDescription className="text-white/70">
                Set the start and end times for the voting period
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date" className="text-white">
                    Start Date
                  </Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={settings.votingStartDate}
                    onChange={(e) => setSettings((prev) => ({ ...prev, votingStartDate: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start-time" className="text-white">
                    Start Time
                  </Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={settings.votingStartTime}
                    onChange={(e) => setSettings((prev) => ({ ...prev, votingStartTime: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date" className="text-white">
                    End Date
                  </Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={settings.votingEndDate}
                    onChange={(e) => setSettings((prev) => ({ ...prev, votingEndDate: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time" className="text-white">
                    End Time
                  </Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={settings.votingEndTime}
                    onChange={(e) => setSettings((prev) => ({ ...prev, votingEndTime: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <Label className="text-white font-medium">Voting Status</Label>
                  <p className="text-white/70 text-sm">
                    {votingOpen ? "Voting is currently open" : "Voting is currently closed"}
                  </p>
                </div>
                <Button
                  onClick={toggleVoting}
                  className={votingOpen ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                >
                  {votingOpen ? "Close Voting" : "Open Voting"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription className="text-white/70">Configure authentication and security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white font-medium">Require Student ID</Label>
                  <p className="text-white/70 text-sm">Students must provide their student ID to vote</p>
                </div>
                <Switch
                  checked={settings.requireStudentId}
                  onCheckedChange={(checked: boolean) => setSettings((prev) => ({ ...prev, requireStudentId: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white font-medium">Allow Vote Changes</Label>
                  <p className="text-white/70 text-sm">Allow students to change their vote before deadline</p>
                </div>
                <Switch
                  checked={settings.allowVoteChanges}
                  onCheckedChange={(checked: boolean) => setSettings((prev) => ({ ...prev, allowVoteChanges: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Results Settings */}
          <Card className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="h-5 w-5" />
                Results Settings
              </CardTitle>
              <CardDescription className="text-white/70">Control when and how results are displayed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white font-medium">Allow Results View</Label>
                  <p className="text-white/70 text-sm">Students can view live results during voting</p>
                </div>
                <Switch
                  checked={settings.allowResultsView}
                  onCheckedChange={(checked: boolean) => setSettings((prev) => ({ ...prev, allowResultsView: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="backdrop-blur-xl bg-red-950/40 border border-red-500/40 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription className="text-white/70">Configure email notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white font-medium">Email Notifications</Label>
                  <p className="text-white/70 text-sm">Send email confirmations and reminders</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked: boolean) => setSettings((prev) => ({ ...prev, emailNotifications: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
