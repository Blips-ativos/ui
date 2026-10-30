import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@blips/ui/components/progress";

export default function ProgressWithLabel() {
  return (
    <Progress value={56} className="w-full max-w-sm">
      <ProgressLabel>Progresso do envio</ProgressLabel>
      <ProgressValue />
    </Progress>
  );
}
