import { db } from "@/db/drizzle";
import { pests, cropPests, crops } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PestDetailContent } from "@/components/PestDetailContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pest = await db.query.pests.findFirst({
    where: eq(pests.slug, slug),
  });

  if (!pest) {
    return { title: "Pest Not Found | Agriculture Learning Hub Zambia" };
  }

  return {
    title: `${pest.name} | Agriculture Learning Hub Zambia`,
    description: `Symptoms and control methods for ${pest.name} in Zambian crops.`,
  };
}

export default async function PestDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pest = await db.query.pests.findFirst({
    where: eq(pests.slug, slug),
  });

  if (!pest) return notFound();

  const affectedCrops = await db
    .select({
      id: crops.id,
      slug: crops.slug,
      name: crops.name,
    })
    .from(cropPests)
    .innerJoin(crops, eq(cropPests.cropId, crops.id))
    .where(eq(cropPests.pestId, pest.id));

  return (
    <main id="main-content" className="max-w-3xl mx-auto px-4 py-10">
      {pest.image && (
        <div className="relative w-full h-56 sm:h-72 rounded-lg overflow-hidden mb-4 bg-gray-100">
          <Image
            src={pest.image}
            alt={pest.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4">{pest.name}</h1>

      <PestDetailContent pest={pest} affectedCrops={affectedCrops} />
    </main>
  );
}