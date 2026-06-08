"use client"

import { Toggle } from "@blips/ui/components/toggle"
import { Italic } from "lucide-react"

export default function ToggleOutline() {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <Italic className="h-4 w-4" />
    </Toggle>
  )
}
