import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const agents = ["*", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bytespider", "CCBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: agents.map((userAgent) => ({ userAgent, allow: "/" })),
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
