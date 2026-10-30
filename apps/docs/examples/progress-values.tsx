import { Progress } from "@blips/ui/components/progress";

export default function ProgressValues() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Progress value={0} />
      <Progress value={25} />
      <Progress value={50} />
      <Progress value={75} />
      <Progress value={100} />
    </div>
  );
}
