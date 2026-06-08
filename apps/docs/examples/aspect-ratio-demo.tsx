"use client"
import { AspectRatio } from "@blips/ui/components/aspect-ratio"
export default function AspectRatioDemo() {
  return (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md flex items-center justify-center">
        <span className="text-muted-foreground text-sm">16:9</span>
      </AspectRatio>
    </div>
  )
}
