import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-config";
import { locales } from "@/lib/i18n";

const paths = [
  "",
  "/about",
  "/research",
  "/dissertation",
  "/publications",
  "/teaching",
  "/cv",
  "/talks",
  "/community",
  "/news",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    for (const locale of locales) {
      entries.push({
        url: `${siteConfig.siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" || path === "/news" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${siteConfig.siteUrl}/${l}${path}`])),
        },
      });
    }
  }

  return entries;
}
