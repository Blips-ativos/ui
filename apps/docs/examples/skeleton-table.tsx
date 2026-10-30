import { Skeleton } from "@blips/ui/components/skeleton";

const rows = ["linha-1", "linha-2", "linha-3"];

export default function SkeletonTable() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      {rows.map((row) => (
        <div key={row} className="flex gap-4">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}
