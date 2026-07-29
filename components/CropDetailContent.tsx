"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/EmptyState";
import { CropQuiz } from "@/components/CropQuiz";
import { Bug } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

type Pest = {
  id: string;
  slug: string;
  name: string;
};

type Crop = {
  id: string;
  name: string;
  overview: string | null;
  plantingStart: string | null;
  plantingEnd: string | null;
  landPreparation: string[] | null;
  spacing: string | null;
  fertilizerBasal: string | null;
  fertilizerTopDressing: string | null;
  harvestTime: string | null;
  commonVarieties: string[] | null;
};

export function CropDetailContent({
  crop,
  relatedPests,
  questions,
}: {
  crop: Crop;
  relatedPests: Pest[];
  questions: Question[];
}) {
  const { t } = useLanguage();

  return (
    <>
      <p className="text-gray-700 mb-6">{crop.overview}</p>

      <Tabs defaultValue="landprep" className="w-full">
        <TabsList>
          <TabsTrigger value="landprep">{t.detail.landPrep}</TabsTrigger>
          <TabsTrigger value="fertilizer">{t.detail.fertilizer}</TabsTrigger>
          <TabsTrigger value="pests">{t.detail.pests}</TabsTrigger>
          <TabsTrigger value="harvest">{t.detail.harvest}</TabsTrigger>
          <TabsTrigger value="quiz">{t.detail.quiz}</TabsTrigger>
        </TabsList>

        <TabsContent value="landprep">
          <p className="text-sm text-gray-600 mb-2">
            {t.detail.plantingWindow}: {crop.plantingStart} – {crop.plantingEnd}
          </p>
          <ul className="list-disc list-inside space-y-1">
            {crop.landPreparation?.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-gray-600">
            {t.detail.spacing}: {crop.spacing}
          </p>
        </TabsContent>

        <TabsContent value="fertilizer">
          <p className="mb-2">
            <strong>{t.detail.basal}:</strong> {crop.fertilizerBasal}
          </p>
          <p>
            <strong>{t.detail.topDressing}:</strong> {crop.fertilizerTopDressing}
          </p>
        </TabsContent>

        <TabsContent value="pests">
          {relatedPests.length === 0 ? (
            <EmptyState
              icon={Bug}
              title={t.detail.noPestsRecorded}
              description={t.detail.noPestsDescription}
            />
          ) : (
            <ul className="space-y-2">
              {relatedPests.map((pest) => (
                <li key={pest.id}>
                  <Link
                    href={`/pests/${pest.slug}`}
                    className="text-green-700 hover:underline"
                  >
                    {pest.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="harvest">
          <p>{crop.harvestTime}</p>
          <p className="mt-3 text-sm text-gray-600">
            {t.detail.commonVarieties}: {crop.commonVarieties?.join(", ")}
          </p>
        </TabsContent>

        <TabsContent value="quiz">
          <CropQuiz cropId={crop.id} questions={questions} />
        </TabsContent>
      </Tabs>
    </>
  );
}