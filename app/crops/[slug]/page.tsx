import { db } from "@/db/drizzle";
import {
  crops,
  cropPests,
  pests,
  savedCrops,
  userProgress,
  users,
  quizQuestions,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { SaveCropButton } from "@/components/SaveCropButton";
import { MarkCompleteButton } from "@/components/MarkCompleteButton";
import { CropDetailContent } from "@/components/CropDetailContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const crop = await db.query.crops.findFirst({
    where: eq(crops.slug, slug),
  });

  if (!crop) {
    return { title: "Crop Not Found | Agriculture Learning Hub Zambia" };
  }

  return {
    title: `${crop.name} | Agriculture Learning Hub Zambia`,
    description: crop.overview ?? `Learn how to grow ${crop.name} in Zambia.`,
  };
}

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

  const questions = await db
    .select({
      id: quizQuestions.id,
      question: quizQuestions.question,
      options: quizQuestions.options,
      correctAnswer: quizQuestions.correctAnswer,
    })
    .from(quizQuestions)
    .where(eq(quizQuestions.cropId, crop.id));

  const { userId } = await auth();
  let initiallySaved = false;
  let initiallyCompleted = false;

  if (userId) {
    const dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, userId),
    });

    if (dbUser) {
      const existingSave = await db.query.savedCrops.findFirst({
        where: and(
          eq(savedCrops.userId, dbUser.id),
          eq(savedCrops.cropId, crop.id)
        ),
      });
      initiallySaved = !!existingSave;

      const existingProgress = await db.query.userProgress.findFirst({
        where: and(
          eq(userProgress.userId, dbUser.id),
          eq(userProgress.cropId, crop.id)
        ),
      });
      initiallyCompleted = existingProgress?.completed ?? false;
    }
  }

  return (
    <main id="main-content" className="max-w-3xl mx-auto px-4 py-10">
      {crop.image && (
        <div className="relative w-full h-56 sm:h-72 rounded-lg overflow-hidden mb-4 bg-gray-100">
          <Image
            src={crop.image}
            alt={`${crop.name} crop`}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">{crop.name}</h1>
          {crop.scientificName && (
            <p className="text-gray-500 italic">{crop.scientificName}</p>
          )}
        </div>
        {userId && (
          <div className="flex gap-2 flex-wrap">
            <SaveCropButton cropId={crop.id} initiallySaved={initiallySaved} />
            <MarkCompleteButton
              cropId={crop.id}
              initiallyCompleted={initiallyCompleted}
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1 my-3">
        {crop.zones?.map((zone) => (
          <Badge key={zone} variant="outline">
            Zone {zone}
          </Badge>
        ))}
      </div>

      <CropDetailContent
        crop={crop}
        relatedPests={relatedPests}
        questions={questions}
      />
    </main>
  );
}