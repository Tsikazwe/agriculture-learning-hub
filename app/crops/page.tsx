import { db } from "@/db/drizzle";
import { crops } from "@/db/schema";
import { CropLibraryFilters } from "@/components/CropLibraryFilters";

export const metadata = {
  title: "Crop Library | Agriculture Learning Hub Zambia",
  description:
    "Browse crops suited to Zambia's agro-ecological zones, with guidance on planting, fertilizer, and harvest timing.",
};
//export const dynamic = "force-dynamic";

export default async function CropsPage() {
  const allCrops = await db.select().from(crops);

  return (
    <main id="main-content" className="max-w-6xl mx-auto px-4 py-10">
      <CropLibraryFilters crops={allCrops} />
    </main>
  );
}