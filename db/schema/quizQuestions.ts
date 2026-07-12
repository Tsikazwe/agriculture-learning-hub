import { sql } from "drizzle-orm";
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { crops } from "./crops";

// Defines the "quiz_questions" table, storing quiz questions tied to a specific crop.
export const quizQuestions = pgTable("quiz_questions", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  cropId: text("crop_id")
    .notNull()
    .references(() => crops.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  options: text("options").array().notNull(),
  correctAnswer: integer("correct_answer").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});