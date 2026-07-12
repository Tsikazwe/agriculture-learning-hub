import { sql } from "drizzle-orm";
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { crops } from "./crops";

// Defines the "quiz_attempts" table, recording each quiz attempt and score per user per crop.
export const quizAttempts = pgTable("quiz_attempts", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  cropId: text("crop_id")
    .notNull()
    .references(() => crops.id, { onDelete: "cascade" }),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  attemptedAt: timestamp("attempted_at").defaultNow().notNull(),
});