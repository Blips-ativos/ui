"use client";
import { Checkbox } from "@blips/ui/components/checkbox";
import { Label } from "@blips/ui/components/label";
export default function CheckboxDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}
