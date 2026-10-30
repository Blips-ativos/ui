import { Card, CardContent, CardHeader } from "@blips/ui/components/card";
import { Skeleton } from "@blips/ui/components/skeleton";

export default function SkeletonCard() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-square w-full" />
      </CardContent>
    </Card>
  );
}
