import { MetadataRoute } from "next";
import { db } from "@/db/drizzle";
import { crops, pests } from "@/db/schema";

// Skip static pre-rendering at build time to prevent database connection timeouts
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://your-app-name.vercel.app";

  let cropRoutes: MetadataRoute.Sitemap = [];
  let pestRoutes: MetadataRoute.Sitemap = [];

  try {
    const allCrops = await db.select({ slug: crops.slug }).from(crops);
    const allPests = await db.select({ slug: pests.slug }).from(pests);

    cropRoutes = allCrops.map((crop) => ({
      url: `${baseUrl}/crops/${crop.slug}`,
      lastModified: new Date(),
    }));

    pestRoutes = allPests.map((pest) => ({
      url: `${baseUrl}/pests/${pest.slug}`,
      lastModified: new Date(),
    }));
  } catch (error) {
    console.error("Failed to fetch sitemap routes from database during build:", error);
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/crops`, lastModified: new Date() },
    { url: `${baseUrl}/pests`, lastModified: new Date() },
    { url: `${baseUrl}/calendar`, lastModified: new Date() },
  ];

  return [...staticRoutes, ...cropRoutes, ...pestRoutes];
}