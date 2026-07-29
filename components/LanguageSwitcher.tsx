"use client";

import { useLanguage } from "@/lib/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(val) => setLanguage(val as any)}>
      <SelectTrigger className="w-auto gap-1.5 text-sm">
        <Languages className="w-4 h-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="english">English</SelectItem>
        <SelectItem value="bemba">Bemba</SelectItem>
        <SelectItem value="nyanja">Nyanja</SelectItem>
      </SelectContent>
    </Select>
  );
}