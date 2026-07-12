import { sql } from "drizzle-orm";
import { pgTable, pgEnum, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

// Supported languages for the app — extend this list as translations are added
export const languageEnum = pgEnum("language", [
  "english",
  "bemba",
  "nyanja",
  "tonga",
  "lozi",
]);

// Defines the "users" table, storing user profile and Zambia-specific farming context.
export const users = pgTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    clerkId: text("clerk_id").notNull().unique(),
    email: text("email").notNull().unique(),
    name: text("name"),
    username: text("username").unique(),
    avatarUrl: text("avatar_url"),
    province: text("province"), // e.g. "Eastern", "Southern", "Copperbelt"
    agroZone: text("agro_zone"), // e.g. "I", "IIa", "IIb", "III"
    preferredLanguage: languageEnum("preferred_language").default("english"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      clerkIdIdx: uniqueIndex("clerk_id_idx").on(table.clerkId),
      emailIdx: uniqueIndex("email_idx").on(table.email),
      usernameIdx: uniqueIndex("username_idx").on(table.username),
    };
  }
);