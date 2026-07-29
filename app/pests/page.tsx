import { db } from "@/db/drizzle";
import { pests } from "@/db/schema";
import { PestLibraryList } from "@/components/PestLibraryList";

export const metadata = {
  title: "Pest & Disease Directory | Agriculture Learning Hub Zambia",
  description:
    "Identify common pests and diseases affecting Zambian crops, with organic and chemical control methods.",
};

export const dynamic = "force-dynamic";
export default async function PestsPage() {
  const allPests = await db.select().from(pests);

  return (
    <main id="main-content" className="max-w-6xl mx-auto px-4 py-10">
      <PestLibraryList pests={allPests} />
    </main>
  );
}