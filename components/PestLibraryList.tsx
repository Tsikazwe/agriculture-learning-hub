"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/FadeIn";
import { EmptyState } from "@/components/EmptyState";
import { Bug } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

type Pest = {
  id: string;
  slug: string;
  name: string;
  image: string | null;
  symptoms: string[] | null;
};

export function PestLibraryList({ pests }: { pests: Pest[] }) {
  const { t } = useLanguage();

  return (
    <>
      <FadeIn>
        <h1 className="text-3xl font-bold mb-2 text-green-900">
          {t.pests.title}
        </h1>
        <p className="text-green-700 mb-8">{t.pests.subtitle}</p>
      </FadeIn>

      {pests.length === 0 ? (
        <EmptyState
          icon={Bug}
          title="No pests available"
          description="Pest data hasn't been added yet. Run the seed script to populate the directory."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pests.map((pest, i) => (
            <FadeIn key={pest.id} delay={i * 0.08}>
              <Link href={`/pests/${pest.slug}`}>
                <Card className="h-full hover:shadow-lg hover:-translate-y-1 hover:border-amber-700 transition-all duration-200 cursor-pointer border-amber-100 overflow-hidden pt-0">
                  {pest.image && (
                    <div className="relative w-full h-40 bg-gray-100">
                      <Image
                        src={pest.image}
                        alt={pest.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-green-900">{pest.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {pest.symptoms?.[0]}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      )}
    </>
  );
}