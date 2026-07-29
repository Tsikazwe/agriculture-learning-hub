import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <Skeleton className="h-9 w-72 mb-2" />
      <Skeleton className="h-5 w-64 mb-6" />
      <Skeleton className="h-24 w-64 mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </main>
  );
}