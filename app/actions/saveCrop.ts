"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { savedCrops, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { actionRateLimit } from "@/lib/ratelimit";

export async function toggleSaveCrop(cropId: string) {
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

  const existing = await db.query.savedCrops.findFirst({
    where: and(
      eq(savedCrops.userId, dbUser.id),
      eq(savedCrops.cropId, cropId)
    ),
  });

  if (existing) {
    await db
      .delete(savedCrops)
      .where(
        and(eq(savedCrops.userId, dbUser.id), eq(savedCrops.cropId, cropId))
      );
    revalidatePath("/dashboard");
    return { saved: false };
  } else {
    await db.insert(savedCrops).values({
      userId: dbUser.id,
      cropId,
    });
    revalidatePath("/dashboard");
    return { saved: true };
  }
}