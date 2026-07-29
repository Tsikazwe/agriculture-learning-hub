"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WeatherWidget } from "@/components/WeatherWidget";
import { FadeIn } from "@/components/FadeIn";
import { EmptyState } from "@/components/EmptyState";
import { Sprout, ClipboardList, Bookmark } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

type Crop = {
  id: string;
  slug: string;
  name: string;
  zones?: string[] | null;
};

type Attempt = {
  id: string;
  cropName: string;
  score: number;
  totalQuestions: number;
  attemptedAt: Date | null;
};

export function DashboardContent({
  userName,
  cropsCompleted,
  quizzesTaken,
  averageScore,
  savedCropsCount,
  completedCrops,
  attempts,
  savedCrops,
}: {
  userName: string;
  cropsCompleted: number;
  quizzesTaken: number;
  averageScore: number;
  savedCropsCount: number;
  completedCrops: Crop[];
  attempts: Attempt[];
  savedCrops: Crop[];
}) {
  const { t } = useLanguage();

  const statCards = [
    { label: t.dashboard.cropsCompleted, value: cropsCompleted },
    { label: t.dashboard.quizzesTaken, value: quizzesTaken },
    { label: t.dashboard.averageScore, value: `${averageScore}%` },
    { label: t.dashboard.savedCrops, value: savedCropsCount },
  ];

  return (
    <>
      <FadeIn>
        <h1 className="text-3xl font-bold mb-2 text-green-900">
          {t.dashboard.welcomeBack}, {userName}
        </h1>
        <p className="text-gray-600 mb-6">{t.dashboard.progressIntro}</p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mb-8 max-w-xs">
          <WeatherWidget />
        </div>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {statCards.map((stat, i) => (
          <FadeIn key={stat.label} delay={0.15 + i * 0.05}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 font-normal">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-900">{stat.value}</p>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3}>
        <h2 className="text-xl font-semibold mb-4">
          {t.dashboard.completedCropsHeading}
        </h2>
      </FadeIn>
      {completedCrops.length === 0 ? (
        <EmptyState
          icon={Sprout}
          title={t.dashboard.noCropsCompleted}
          description=""
          actionLabel={t.dashboard.browseCrops}
          actionHref="/crops"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {completedCrops.map((crop, i) => (
            <FadeIn key={crop.id} delay={0.35 + i * 0.05}>
              <Link href={`/crops/${crop.slug}`}>
                <Card className="hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-base">{crop.name}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      )}

      <FadeIn delay={0.4}>
        <h2 className="text-xl font-semibold mb-4">
          {t.dashboard.quizHistoryHeading}
        </h2>
      </FadeIn>
      {attempts.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title={t.dashboard.noQuizzesTaken}
          description=""
          actionLabel={t.dashboard.browseCrops}
          actionHref="/crops"
        />
      ) : (
        <div className="space-y-2 mb-10">
          {attempts.map((attempt, i) => {
            const percentage = Math.round(
              (attempt.score / attempt.totalQuestions) * 100
            );
            return (
              <FadeIn key={attempt.id} delay={0.45 + i * 0.05}>
                <div className="flex items-center justify-between border rounded-md px-4 py-3">
                  <div>
                    <p className="font-medium">{attempt.cropName}</p>
                    <p className="text-xs text-gray-500">
                      {attempt.attemptedAt
                        ? new Date(attempt.attemptedAt).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      percentage >= 70
                        ? "border-green-600 text-green-700"
                        : "border-amber-600 text-amber-700"
                    }
                  >
                    {attempt.score}/{attempt.totalQuestions} ({percentage}%)
                  </Badge>
                </div>
              </FadeIn>
            );
          })}
        </div>
      )}

      <FadeIn delay={0.5}>
        <h2 className="text-xl font-semibold mb-4">
          {t.dashboard.savedCropsHeading}
        </h2>
      </FadeIn>
      {savedCrops.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title={t.dashboard.noSavedCrops}
          description=""
          actionLabel={t.dashboard.browseCrops}
          actionHref="/crops"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {savedCrops.map((crop, i) => (
            <FadeIn key={crop.id} delay={0.55 + i * 0.05}>
              <Link href={`/crops/${crop.slug}`}>
                <Card className="hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-base">{crop.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {crop.zones?.map((z) => (
                        <Badge key={z} variant="outline">
                          Zone {z}
                        </Badge>
                      ))}
                    </div>
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