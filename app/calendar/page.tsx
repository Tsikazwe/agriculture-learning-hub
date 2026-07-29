import { db } from "@/db/drizzle";
import { crops } from "@/db/schema";
import { SeasonalCalendarList } from "@/components/SeasonalCalendarList";

export const metadata = {
  title: "Seasonal Calendar | Agriculture Learning Hub Zambia",
  description:
    "See which crops to plant month by month, based on Zambia's farming seasons.",
};

export const dynamic = "force-dynamic";
export default async function CalendarPage() {
  const allCrops = await db.select().from(crops);

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 py-10">
      <SeasonalCalendarList crops={allCrops} />
    </main>
  );
}