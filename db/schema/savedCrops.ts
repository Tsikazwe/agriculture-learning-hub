import { text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./users";
import { crops } from "./crops";

// Defines the "saved_crops" table, tracking bookmarked crops per user.
export const savedCrops = pgTable(
  "saved_crops",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    cropId: text("crop_id")
      .notNull()
      .references(() => crops.id, { onDelete: "cascade" }),
    savedAt: timestamp("saved_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.cropId] }),
    };
  }
);