import { sql } from "drizzle-orm";
import { pgTable, text, uniqueIndex, timestamp } from "drizzle-orm/pg-core";

// Defines the "pests" table, storing pest/disease info and control methods.
export const pests = pgTable(
  "pests",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    image: text("image"),
    symptoms: text("symptoms").array(),
    organicControl: text("organic_control").array(),
    chemicalControl: text("chemical_control").array(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      slugIdx: uniqueIndex("pest_slug_idx").on(table.slug),
    };
  }
);