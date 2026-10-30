import { Slider } from "@blips/ui/components/slider";

export default function SliderDisabled() {
  return (
    <Slider defaultValue={50} max={100} step={1} disabled className="w-[60%]" />
  );
}
