"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

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
        Something went wrong loading the pest directory
      </h2>
      <p className="text-gray-500 mb-6">
        This might be a temporary issue. Try again in a moment.
      </p>
      <Button onClick={() => reset()}>Try Again</Button>
    </main>
  );
}