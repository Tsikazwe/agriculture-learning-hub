import { db } from "@/db/drizzle";
import { users, userProgress, quizAttempts, savedCrops, crops } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { DashboardContent } from "@/components/DashboardContent";

export const metadata = {
  title: "Dashboard | Agriculture Learning Hub Zambia",
  description: "Track your learning progress, quiz history, and saved crops.",
};

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <main id="main-content" className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-gray-500">Please sign in to view your dashboard.</p>
      </main>
    );
  }

  const dbUser = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });

  if (!dbUser) {
    return (
      <main id="main-content" className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-gray-500">
          Setting up your account — please refresh in a moment.
        </p>
      </main>
    );
  }

  const progress = await db.query.userProgress.findMany({
    where: eq(userProgress.userId, dbUser.id),
  });

  const attemptsRaw = await db.query.quizAttempts.findMany({
    where: eq(quizAttempts.userId, dbUser.id),
    orderBy: (quizAttempts, { desc }) => [desc(quizAttempts.attemptedAt)],
  });

  const saved = await db
    .select({
      id: crops.id,
      slug: crops.slug,
      name: crops.name,
      zones: crops.zones,
    })
    .from(savedCrops)
    .innerJoin(crops, eq(savedCrops.cropId, crops.id))
    .where(eq(savedCrops.userId, dbUser.id));

  const completedCropIds = progress
    .filter((p) => p.completed)
    .map((p) => p.cropId);

  const completedCrops =
    completedCropIds.length > 0
      ? await db.query.crops.findMany({
          where: (crops, { inArray }) => inArray(crops.id, completedCropIds),
        })
      : [];

  const attempts = await Promise.all(
    attemptsRaw.map(async (attempt) => {
      const crop = await db.query.crops.findFirst({
        where: eq(crops.id, attempt.cropId),
      });
      return {
        id: attempt.id,
        cropName: crop?.name ?? "Unknown crop",
        score: attempt.score,
        totalQuestions: attempt.totalQuestions,
        attemptedAt: attempt.attemptedAt,
      };
    })
  );

  const averageScore =
    attempts.length > 0
      ? Math.round(
          (attempts.reduce((sum, a) => sum + a.score / a.totalQuestions, 0) /
            attempts.length) *
            100
        )
      : 0;

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 py-10">
      <DashboardContent
        userName={dbUser.name || "Learner"}
        cropsCompleted={completedCrops.length}
        quizzesTaken={attempts.length}
        averageScore={averageScore}
        savedCropsCount={saved.length}
        completedCrops={completedCrops}
        attempts={attempts}
        savedCrops={saved}
      />
    </main>
  );
}