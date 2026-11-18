import { HomeClient } from "@/components/HomeClient";
import { getWebStoreAndKnowledge } from "@/lib/catalog";

export const revalidate = 60;

/**
 * Homepage Server Component entry point for Toko Amen Snack Sungailiat.
 */
export default async function HomePage() {
  const storeData = await getWebStoreAndKnowledge();

  return (
    <HomeClient
      liveOpeningHoursWeekday={storeData.store.openingHoursWeekday}
      liveOpeningHoursSunday={storeData.store.openingHoursSunday}
    />
  );
}
