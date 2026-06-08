"use client"
import { Checkbox } from "@blips/ui/components/checkbox"
import { Label } from "@blips/ui/components/label"
export default function CheckboxDisabled() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms2" disabled />
      <Label htmlFor="terms2">Accept terms and conditions</Label>
    </div>
  )
}
