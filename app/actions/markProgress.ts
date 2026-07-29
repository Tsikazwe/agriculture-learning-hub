"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { userProgress, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { actionRateLimit } from "@/lib/ratelimit";

export async function markCropCompleted(cropId: string) {
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

  const existing = await db.query.userProgress.findFirst({
    where: and(
      eq(userProgress.userId, dbUser.id),
      eq(userProgress.cropId, cropId)
    ),
  });

  if (existing) {
    await db
      .update(userProgress)
      .set({ completed: true, updatedAt: new Date() })
      .where(eq(userProgress.id, existing.id));
  } else {
    await db.insert(userProgress).values({
      userId: dbUser.id,
      cropId,
      completed: true,
    });
  }

  revalidatePath("/dashboard");
  return { success: true };
}