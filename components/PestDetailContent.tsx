"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";

type Crop = {
  id: string;
  slug: string;
  name: string;
};

type Pest = {
  symptoms: string[] | null;
  organicControl: string[] | null;
  chemicalControl: string[] | null;
};

export function PestDetailContent({
  pest,
  affectedCrops,
}: {
  pest: Pest;
  affectedCrops: Crop[];
}) {
  const { t } = useLanguage();

  return (
    <>
      {affectedCrops.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-sm text-gray-500">{t.detail.affects}:</span>
          {affectedCrops.map((crop) => (
            <Link key={crop.id} href={`/crops/${crop.slug}`}>
              <Badge variant="outline" className="hover:bg-gray-100">
                {crop.name}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t.detail.symptoms}</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {pest.symptoms?.map((symptom, i) => (
            <li key={i}>{symptom}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-green-700">
          {t.detail.organicControl}
        </h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {pest.organicControl?.map((method, i) => (
            <li key={i}>{method}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-amber-700">
          {t.detail.chemicalControl}
        </h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {pest.chemicalControl?.map((method, i) => (
            <li key={i}>{method}</li>
          ))}
        </ul>
      </section>
    </>
  );
}