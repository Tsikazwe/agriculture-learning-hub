import { sql } from "drizzle-orm";
import { pgTable, pgEnum, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

// Agro-ecological zones used to classify where a crop grows well in Zambia
export const agroZoneEnum = pgEnum("agro_zone", ["I", "IIa", "IIb", "III"]);

// Defines the "crops" table, storing crop info, planting guidance, and growing conditions.
export const crops = pgTable(
  "crops",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    scientificName: text("scientific_name"),
    image: text("image"),
    zones: agroZoneEnum("zones").array(),
    plantingStart: text("planting_start"),
    plantingEnd: text("planting_end"),
    overview: text("overview"),
    landPreparation: text("land_preparation").array(),
    spacing: text("spacing"),
    fertilizerBasal: text("fertilizer_basal"),
    fertilizerTopDressing: text("fertilizer_top_dressing"),
    commonVarieties: text("common_varieties").array(),
    harvestTime: text("harvest_time"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      slugIdx: uniqueIndex("crop_slug_idx").on(table.slug),
    };
  }
);