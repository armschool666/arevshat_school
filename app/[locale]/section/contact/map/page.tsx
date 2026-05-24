import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export default async function MapRedirectPage() {
  const locale = await getLocale();
  redirect(`/${locale}/section/contact#map`);
}
