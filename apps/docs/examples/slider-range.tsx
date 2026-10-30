import { Slider } from "@blips/ui/components/slider";

export default function SliderRange() {
  return (
    <div className="flex w-[60%] flex-col gap-8">
      <Slider defaultValue={[25, 50]} max={100} step={5} />
      <Slider defaultValue={[10, 20, 70]} max={100} step={10} />
    </div>
  );
}
