import { notFound } from "next/navigation";
import { Link } from "../../../../../i18n/navigation";
import { SiteShell } from "../../../../components";
import { sections } from "../../../../data";
import { UserMaterials } from "../../../../user-materials";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return sections.flatMap((section) =>
    section.links.map((link) => ({
      slug: section.slug,
      childSlug: link.slug,
    })),
  );
}

export default async function ChildSectionPage({
  params,
}: {
  params: Promise<{ slug: string; childSlug: string; locale: string }>;
}) {
  const { slug, childSlug } = await params;
  const section = sections.find((item) => item.slug === slug);
  const page = section?.links.find((item) => item.slug === childSlug);

  if (!section || !page) {
    notFound();
  }

  return (
    <SiteShell>
      <section className="subhero" style={page.slug === "leadership" ? { gridTemplateColumns: "1fr", minHeight: "220px" } : undefined}>
        {page.slug !== "leadership" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={section.image} alt={page.title} loading="lazy" />
        )}
        <div>
          <Link href={`/section/${section.slug}`}>{section.title}</Link>
          <h1>{page.title}</h1>
          <p>{page.body}</p>
        </div>
      </section>

      {page.image && page.content && page.content.length > 0 ? (
        <section className="section-wrap">
          <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={page.image}
              alt={page.title}
              loading="lazy"
              style={{ width: "240px", minWidth: "180px", flexShrink: 0, borderRadius: "var(--radius, 8px)", objectFit: "cover" }}
            />
            <div style={{ flex: 1, minWidth: "260px", display: "flex", flexDirection: "column", gap: "0.75rem", lineHeight: "1.9" }}>
              {page.content.map((para, i) => (
                <p key={i} style={{ margin: 0 }}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          {page.image && (
            <section className="section-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={page.image}
                alt={page.title}
                loading="lazy"
                style={{ width: "100%", maxHeight: "480px", objectFit: "cover", borderRadius: "var(--radius, 8px)" }}
              />
            </section>
          )}
          {page.content && page.content.length > 0 && (
            <section className="section-wrap">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", lineHeight: "1.8" }}>
                {page.content.map((para, i) => (
                  <p key={i} style={{ margin: 0 }}>{para}</p>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <UserMaterials sectionSlug={section.slug} pageSlug={page.slug} />
    </SiteShell>
  );
}
