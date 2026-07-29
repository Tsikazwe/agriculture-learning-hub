"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { quizAttempts, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { actionRateLimit } from "@/lib/ratelimit";

export async function submitQuizAttempt(
  cropId: string,
  score: number,
  totalQuestions: number
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { success } = await actionRateLimit.limit(userId);
  if (!success) {
    throw new Error("Too many requests. Please slow down.");
  }

  const dbUser = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });
  if (!dbUser) throw new Error("User not found");

  await db.insert(quizAttempts).values({
    userId: dbUser.id,
    cropId,
    score,
    totalQuestions,
  });

  revalidatePath("/dashboard");
  return { success: true, score, totalQuestions };
}