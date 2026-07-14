import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET in .env.local");
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url, username } = evt.data;
    const email = email_addresses[0]?.email_address ?? "";
    const name = first_name
      ? `${first_name} ${last_name || ""}`.trim()
      : username || email?.split("@")[0] || "Learner";

    await db.insert(users).values({
      clerkId: id,
      email,
      name,
      username: username ?? null,
      avatarUrl: image_url ?? null,
    });
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url, username } = evt.data;
    const email = email_addresses[0]?.email_address ?? "";
    const name = first_name
      ? `${first_name} ${last_name || ""}`.trim()
      : username || email?.split("@")[0] || "Learner";

    await db
      .update(users)
      .set({
        email,
        name,
        username: username ?? null,
        avatarUrl: image_url ?? null,
        updatedAt: new Date(),
      })
      .where(eq(users.clerkId, id));
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    if (id) {
      await db.delete(users).where(eq(users.clerkId, id));
    }
  }

  return new Response("Webhook processed", { status: 200 });
}