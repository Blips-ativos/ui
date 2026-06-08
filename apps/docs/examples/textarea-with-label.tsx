"use client"
import { Textarea } from "@blips/ui/components/textarea"
import { Label } from "@blips/ui/components/label"
export default function TextareaWithLabel() {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  )
}
