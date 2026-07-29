import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center text-center px-4 py-24 min-h-[60vh]">
      <Sprout className="w-12 h-12 text-green-700 mb-4" />
      <h1 className="text-4xl font-bold mb-2 text-green-900">404</h1>
      <p className="text-gray-600 max-w-md mb-8">
        This page couldn't be found. It might have been moved, or the link
        might be incorrect.
      </p>
      <div className="flex gap-3">
        <Link href="/">
          <Button className="bg-green-700 hover:bg-green-800">
            Go Home
          </Button>
        </Link>
        <Link href="/crops">
          <Button variant="outline">Browse Crops</Button>
        </Link>
      </div>
    </main>
  );
}