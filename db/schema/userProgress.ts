import { sql } from "drizzle-orm";
import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { crops } from "./crops";

// Defines the "user_progress" table, tracking which crops a user has completed.
export const userProgress = pgTable("user_progress", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  cropId: text("crop_id")
    .notNull()
    .references(() => crops.id, { onDelete: "cascade" }),
  completed: boolean("completed").default(false).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});