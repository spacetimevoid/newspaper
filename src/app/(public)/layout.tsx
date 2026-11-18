import { SiteHeader } from "@/components/editorial/site-header";
import { SiteFooter } from "@/components/editorial/site-footer";

// Keep the masthead date current on each request, including after midnight.
export const dynamic = "force-dynamic";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const date = new Date();
  return (
    <>
      <SiteHeader date={date} />
      {children}
      <SiteFooter year={Number(new Intl.DateTimeFormat("en", { year: "numeric", timeZone: "Asia/Saigon" }).format(date))} />
    </>
  );
}
