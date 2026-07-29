"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type Crop = {
  id: string;
  slug: string;
  name: string;
  plantingStart: string | null;
  plantingEnd: string | null;
  zones: string[] | null;
};

export function SeasonalCalendarList({ crops }: { crops: Crop[] }) {
  const { t } = useLanguage();

  const cropsByMonth: Record<string, Crop[]> = {};
  for (const month of MONTHS) {
    cropsByMonth[month] = crops.filter(
      (crop) => crop.plantingStart === month
    );
  }

  const hasAnyData = crops.some((crop) => crop.plantingStart);

  return (
    <>
      <h1 className="text-3xl font-bold mb-2 text-green-900">
        {t.calendar.title}
      </h1>
      <p className="text-green-700 mb-8">{t.calendar.subtitle}</p>

      {!hasAnyData ? (
        <p className="text-gray-500">{t.calendar.noData}</p>
      ) : (
        <div className="space-y-8">
          {MONTHS.map((month) => {
            const monthCrops = cropsByMonth[month];
            if (monthCrops.length === 0) return null;

            return (
              <div key={month}>
                <h2 className="text-xl font-semibold mb-3 text-green-800">
                  {month}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {monthCrops.map((crop) => (
                    <Link key={crop.id} href={`/crops/${crop.slug}`}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader>
                          <CardTitle className="text-base">
                            {crop.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-gray-500 mb-2">
                            {t.calendar.plantLabel}: {crop.plantingStart} –{" "}
                            {crop.plantingEnd}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {crop.zones?.map((zone) => (
                              <Badge key={zone} variant="outline">
                                Zone {zone}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}