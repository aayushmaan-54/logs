import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getBlogPostPath } from "@/utils/getPostPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/site.config";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.website,
    items: sortedPosts.map(({ data, id, filePath }) => ({
      link: getBlogPostPath(id, filePath),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
