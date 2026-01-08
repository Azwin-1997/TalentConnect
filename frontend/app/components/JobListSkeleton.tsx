import { Skeleton } from "./Skeleton";

export default function JobListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="rounded-lg border p-4">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="mt-2 h-4 w-1/3" />
          <Skeleton className="mt-4 h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
