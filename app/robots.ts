import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const allow = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

// Link-preview crawlers obey robots.txt: blocking them leaves shared links without a thumbnail.
// They may fetch pages even while search engines are kept out (the noindex meta still applies).
const previewBots = ["facebookexternalhit", "Facebot", "meta-externalagent", "Twitterbot", "LinkedInBot", "WhatsApp", "TelegramBot", "Slackbot", "Discordbot", "Viber", "SkypeUriPreview", "Pinterestbot", "redditbot"];

export default function robots(): MetadataRoute.Robots {
  return allow
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` }
    : { rules: [{ userAgent: previewBots, allow: "/" }, { userAgent: "*", disallow: "/" }] };
}
