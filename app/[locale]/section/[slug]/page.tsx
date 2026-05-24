import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "../../../../i18n/navigation";
import { SiteShell } from "../../../components";
import { sections } from "../../../data";

export function generateStaticParams() {
  return sections.map((section) => ({ slug: section.slug }));
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations();
  const section = sections.find((item) => item.slug === slug);

  if (!section) {
    notFound();
  }

  return (
    <SiteShell>
      <section className="subhero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={section.image} alt={section.title} loading="lazy" />
        <div>
          <Link href="/">{t("section.homeLink")}</Link>
          <h1>{section.title}</h1>
          <p>{section.description}</p>
        </div>
      </section>

      {section.content && section.content.length > 0 && (
        <section className="section-wrap">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", lineHeight: "1.8" }}>
            {section.content.map((para, i) =>
              para.split("\n").filter((line) => line.trim()).map((line, j) => (
                <p key={`${i}-${j}`} style={{ margin: 0 }}>{line.trim()}</p>
              ))
            )}
          </div>
        </section>
      )}

      {section.photos && section.photos.length > 0 && (
        <section className="section-wrap">
          <div className="section-heading">
            <p className="eyebrow">{t("section.photosEyebrow")}</p>
            <h2>{t("section.photosTitle")}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {section.photos.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={section.title}
                loading="lazy"
                style={{ width: "100%", height: "240px", objectFit: "cover", borderRadius: "var(--radius, 8px)" }}
              />
            ))}
          </div>
        </section>
      )}

      <section className="section-wrap">
        <div className="section-heading">
          <p className="eyebrow">{t("section.structureEyebrow")}</p>
          <h2>{section.title}</h2>
        </div>
        <div className="list-grid">
          {section.links.map((link) => (
            <Link
              className="list-card"
              href={`/section/${section.slug}/${link.slug}`}
              key={link.slug}
            >
              <div>
                <h3>{link.title}</h3>
                <p>{link.body}</p>
              </div>
              <span className="list-card-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
