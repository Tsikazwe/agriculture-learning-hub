"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Cloud, CloudRain, Sun } from "lucide-react";

// Lusaka coordinates as a sensible default for Zambia
const DEFAULT_LAT = -15.4067;
const DEFAULT_LON = 28.2871;

function useWeather(lat: number, lon: number) {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: async () => {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      if (!res.ok) throw new Error("Failed to fetch weather");
      return res.json();
    },
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
  });
}

function getWeatherIcon(main: string) {
  if (main === "Rain" || main === "Drizzle") return CloudRain;
  if (main === "Clouds") return Cloud;
  return Sun;
}

export function WeatherWidget() {
  const { data, isLoading, isError } = useWeather(DEFAULT_LAT, DEFAULT_LON);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-24" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-16" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-gray-500">Weather unavailable</p>
        </CardContent>
      </Card>
    );
  }

  const Icon = getWeatherIcon(data.weather?.[0]?.main);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-gray-500 font-normal flex items-center gap-2">
          <Icon className="w-4 h-4" />
          {data.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{Math.round(data.main?.temp)}°C</p>
        <p className="text-sm text-gray-500 capitalize">
          {data.weather?.[0]?.description}
        </p>
      </CardContent>
    </Card>
  );
}