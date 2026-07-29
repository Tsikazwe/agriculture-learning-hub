"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-20 text-center">
      <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">
        Something went wrong loading this pest
      </h2>
      <p className="text-gray-500 mb-6">
        This might be a temporary issue. Try again, or browse other pests.
      </p>
      <div className="flex gap-3 justify-center">
        <Button onClick={() => reset()}>Try Again</Button>
        <Link href="/pests">
          <Button variant="outline">Back to Pest Directory</Button>
        </Link>
      </div>
    </main>
  );
}