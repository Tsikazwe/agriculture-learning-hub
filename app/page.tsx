"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { useLanguage } from "@/lib/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main id="main-content" className="flex flex-col items-center justify-center text-center px-4 py-24">
      <FadeIn>
        <h1 className="text-4xl font-bold mb-4 text-green-900">
          {t.home.title}
        </h1>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="text-gray-600 max-w-xl mb-8">{t.home.subtitle}</p>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="flex gap-4">
          <Link href="/crops">
            <Button className="bg-green-700 hover:bg-green-800">
              {t.home.browseCrops}
            </Button>
          </Link>
          <Link href="/pests">
            <Button
              variant="outline"
              className="border-amber-700 text-amber-800 hover:bg-amber-50"
            >
              {t.home.pestDirectory}
            </Button>
          </Link>
        </div>
      </FadeIn>
    </main>
  );
}