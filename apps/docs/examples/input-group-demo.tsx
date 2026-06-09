"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@blips/ui/components/input-group";
export default function InputGroupDemo() {
  return (
    <InputGroup>
      <InputGroupAddon>https://</InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  );
}
