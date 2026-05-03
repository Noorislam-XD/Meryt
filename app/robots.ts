import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/search", "/verify", "/pricing", "/about", "/profile/"],
        disallow: ["/admin/", "/api/", "/dashboard"],
      },
    ],
    sitemap: "https://meryt.app/sitemap.xml",
  };
}
