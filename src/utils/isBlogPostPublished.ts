import type { CollectionEntry } from "astro:content";
import { SITE } from "@/site.config";

const isBlogPostPublished = ({ data }: CollectionEntry<"blog">) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default isBlogPostPublished;
