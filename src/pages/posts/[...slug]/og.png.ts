import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { getBlogPostPath } from "@/utils/getPostPath";
import generateOgImageForPost from "@/utils/generateOgImageForPost";
import { SITE } from "@/site.config";

export async function getStaticPaths() {
  const posts = await getCollection("blog");

  const routes = posts.map((post) => {
    return {
      params: { slug: getBlogPostPath(post.id, post.filePath, false) },
      props: post,
    };
  });

  return routes;
}

export const GET: APIRoute = async ({ props }) => {
  if (!SITE.dynamicOgImage) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  const buffer = await generateOgImageForPost(props as CollectionEntry<"blog">);
  return new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "image/png" },
  });
};
