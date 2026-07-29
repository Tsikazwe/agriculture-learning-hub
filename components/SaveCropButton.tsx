"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toggleSaveCrop } from "@/app/actions/saveCrop";
import { toast } from "sonner";
import { useLanguage } from "@/lib/LanguageContext";

export function SaveCropButton({
  cropId,
  initiallySaved,
}: {
  cropId: string;
  initiallySaved: boolean;
}) {
  const { t } = useLanguage();
  const [saved, setSaved] = useState(initiallySaved);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      try {
        const result = await toggleSaveCrop(cropId);
        setSaved(result.saved);
        toast.success(result.saved ? t.toast.cropSaved : t.toast.cropRemoved);
      } catch (err) {
        toast.error(t.toast.signInToSave);
      }
    });
  }

  return (
    <Button
      variant={saved ? "default" : "outline"}
      onClick={handleClick}
      disabled={isPending}
    >
      {saved ? (
        <>
          <BookmarkCheck className="w-4 h-4 mr-2" />
          {t.detail.saved}
        </>
      ) : (
        <>
          <Bookmark className="w-4 h-4 mr-2" />
          {t.detail.saveCrop}
        </>
      )}
    </Button>
  );
}