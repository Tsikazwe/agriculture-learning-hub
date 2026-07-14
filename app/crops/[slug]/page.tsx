import { db } from "@/db/drizzle";
import { crops, cropPests, pests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default async function CropDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const crop = await db.query.crops.findFirst({
    where: eq(crops.slug, slug),
  });

  if (!crop) return notFound();

  const relatedPests = await db
    .select({
      id: pests.id,
      slug: pests.slug,
      name: pests.name,
    })
    .from(cropPests)
    .innerJoin(pests, eq(cropPests.pestId, pests.id))
    .where(eq(cropPests.cropId, crop.id));

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">{crop.name}</h1>
      {crop.scientificName && (
        <p className="text-gray-500 italic">{crop.scientificName}</p>
      )}

      <div className="flex flex-wrap gap-1 my-3">
        {crop.zones?.map((zone) => (
          <Badge key={zone} variant="outline">
            Zone {zone}
          </Badge>
        ))}
      </div>

      <p className="text-gray-700 mb-6">{crop.overview}</p>

      <Tabs defaultValue="landprep" className="w-full">
        <TabsList>
          <TabsTrigger value="landprep">Land Prep</TabsTrigger>
          <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
          <TabsTrigger value="pests">Pests</TabsTrigger>
          <TabsTrigger value="harvest">Harvest</TabsTrigger>
        </TabsList>

        <TabsContent value="landprep">
          <p className="text-sm text-gray-600 mb-2">
            Planting window: {crop.plantingStart} – {crop.plantingEnd}
          </p>
          <ul className="list-disc list-inside space-y-1">
            {crop.landPreparation?.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-gray-600">Spacing: {crop.spacing}</p>
        </TabsContent>

        <TabsContent value="fertilizer">
          <p className="mb-2">
            <strong>Basal:</strong> {crop.fertilizerBasal}
          </p>
          <p>
            <strong>Top dressing:</strong> {crop.fertilizerTopDressing}
          </p>
        </TabsContent>

        <TabsContent value="pests">
          {relatedPests.length === 0 ? (
            <p className="text-gray-500">No pests recorded for this crop yet.</p>
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
            Common varieties: {crop.commonVarieties?.join(", ")}
          </p>
        </TabsContent>
      </Tabs>
    </main>
  );
}