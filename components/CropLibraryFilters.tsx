"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeIn } from "@/components/FadeIn";
import { EmptyState } from "@/components/EmptyState";
import { Sprout, Search } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

type Crop = {
  id: string;
  slug: string;
  name: string;
  scientificName: string | null;
  overview: string | null;
  zones: string[] | null;
  image: string | null;
};

const ZONE_OPTIONS = ["I", "IIa", "IIb", "III"];

export function CropLibraryFilters({ crops }: { crops: Crop[] }) {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [zone, setZone] = useState<string>("all");

  const filteredCrops = useMemo(() => {
    return crops.filter((crop) => {
      const matchesSearch = crop.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesZone = zone === "all" || crop.zones?.includes(zone);
      return matchesSearch && matchesZone;
    });
  }, [crops, search, zone]);

  return (
    <>
      <FadeIn>
        <h1 className="text-3xl font-bold mb-2 text-green-900">
          {t.crops.title}
        </h1>
        <p className="text-green-700 mb-8">{t.crops.subtitle}</p>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <label htmlFor="crop-search" className="sr-only">
              Search crops by name
            </label>
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              aria-hidden="true"
            />
            <Input
              id="crop-search"
              placeholder={t.crops.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={zone} onValueChange={(value) => setZone(value ?? "all")}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder={t.crops.allZones} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.crops.allZones}</SelectItem>
              {ZONE_OPTIONS.map((z) => (
                <SelectItem key={z} value={z}>
                  Zone {z}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </FadeIn>

      {filteredCrops.length === 0 ? (
        <EmptyState
          icon={Sprout}
          title="No crops match your search"
          description="Try a different search term or zone filter."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCrops.map((crop, i) => (
            <FadeIn key={crop.id} delay={i * 0.05}>
              <Link href={`/crops/${crop.slug}`}>
                <Card className="h-full hover:shadow-lg hover:-translate-y-1 hover:border-green-700 transition-all duration-200 cursor-pointer border-green-100 overflow-hidden pt-0">
                  {crop.image && (
                    <div className="relative w-full h-40 bg-gray-100">
                      <Image
                        src={crop.image}
                        alt={`${crop.name} crop`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-green-900">{crop.name}</CardTitle>
                    {crop.scientificName && (
                      <p className="text-sm italic text-gray-500">
                        {crop.scientificName}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {crop.zones?.map((z) => (
                        <Badge
                          key={z}
                          variant="outline"
                          className="border-amber-700 text-amber-800"
                        >
                          Zone {z}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {crop.overview}
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