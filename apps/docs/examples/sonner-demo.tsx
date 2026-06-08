"use client"
import { toast } from "sonner"
import { Button } from "@blips/ui/components/button"
export default function SonnerDemo() {
  return (
    <Button variant="outline" onClick={() => toast("Event has been created", { description: "Sunday, December 03, 2023 at 9:00 AM" })}>
      Show Toast
    </Button>
  )
}
