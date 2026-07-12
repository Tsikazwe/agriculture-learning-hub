import { pgTable, text, primaryKey } from "drizzle-orm/pg-core";
import { crops } from "./crops";
import { pests } from "./pests";

// Join table linking crops to the pests that commonly affect them (many-to-many).
export const cropPests = pgTable(
  "crop_pests",
  {
    cropId: text("crop_id")
      .notNull()
      .references(() => crops.id, { onDelete: "cascade" }),
    pestId: text("pest_id")
      .notNull()
      .references(() => pests.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.cropId, table.pestId] }),
    };
  }
);