import { HomeClient } from "@/components/HomeClient";
import { getWebCategories, getWebStoreAndKnowledge } from "@/lib/catalog";

export const revalidate = 60;

/**
 * Homepage Server Component entry point for Toko Amen Snack Sungailiat.
 */
export default async function HomePage() {
  const [categories, storeData] = await Promise.all([
    getWebCategories(),
    getWebStoreAndKnowledge(),
  ]);

  const totalLiveProducts = categories.reduce(
    (sum, c) => sum + c.productCount,
    0
  );

  return (
    <HomeClient
      liveCategories={categories.slice(0, 6)}
      totalLiveProducts={totalLiveProducts}
      liveOpeningHoursWeekday={storeData.store.openingHoursWeekday}
      liveOpeningHoursSunday={storeData.store.openingHoursSunday}
    />
  );
}
