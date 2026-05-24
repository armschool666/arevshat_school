import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export default async function FeedbackRedirectPage() {
  const locale = await getLocale();
  redirect(`/${locale}/section/contact#feedback`);
}
