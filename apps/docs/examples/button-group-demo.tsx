"use client"
import { Button } from "@blips/ui/components/button"
import { ButtonGroup } from "@blips/ui/components/button-group"
export default function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  )
}
