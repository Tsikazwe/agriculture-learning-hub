import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center py-10 px-4 border border-dashed rounded-lg mb-10">
      <Icon className="w-8 h-8 text-gray-400 mb-3" />
      <p className="font-medium text-gray-700 mb-1">{title}</p>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button size="sm" variant="outline">
            {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}