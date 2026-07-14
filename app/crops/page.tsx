import { db } from "@/db/drizzle";
import { crops } from "@/db/schema";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function CropsPage() {
  const allCrops = await db.select().from(crops);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Crop Library</h1>
      <p className="text-gray-600 mb-8">
        Learn best practices for growing crops suited to your agro-ecological zone.
      </p>

      {allCrops.length === 0 ? (
        <p className="text-gray-500">No crops found. Run the seed script first.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allCrops.map((crop) => (
            <Link key={crop.id} href={`/crops/${crop.slug}`}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle>{crop.name}</CardTitle>
                  {crop.scientificName && (
                    <p className="text-sm italic text-gray-500">
                      {crop.scientificName}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {crop.zones?.map((zone) => (
                      <Badge key={zone} variant="outline">
                        Zone {zone}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {crop.overview}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}