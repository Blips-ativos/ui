import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@blips/ui/components/progress";

export default function ProgressIndeterminate() {
  return (
    <Progress value={null} className="w-full max-w-sm">
      <ProgressLabel>Preparando o arquivo</ProgressLabel>
      <ProgressValue>{() => "Aguarde..."}</ProgressValue>
    </Progress>
  );
}
