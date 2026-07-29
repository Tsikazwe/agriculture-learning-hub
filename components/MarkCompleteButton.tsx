"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";
import { markCropCompleted } from "@/app/actions/markProgress";
import { toast } from "sonner";
import { useLanguage } from "@/lib/LanguageContext";

export function MarkCompleteButton({
  cropId,
  initiallyCompleted,
}: {
  cropId: string;
  initiallyCompleted: boolean;
}) {
  const { t } = useLanguage();
  const [completed, setCompleted] = useState(initiallyCompleted);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      try {
        await markCropCompleted(cropId);
        setCompleted(true);
        toast.success(t.toast.markedComplete);
      } catch (err) {
        toast.error(t.toast.signInToTrack);
      }
    });
  }

  return (
    <Button
      variant={completed ? "default" : "outline"}
      onClick={handleClick}
      disabled={isPending || completed}
    >
      {completed ? (
        <>
          <CheckCircle className="w-4 h-4 mr-2" />
          {t.detail.completed}
        </>
      ) : (
        <>
          <Circle className="w-4 h-4 mr-2" />
          {t.detail.markComplete}
        </>
      )}
    </Button>
  );
}