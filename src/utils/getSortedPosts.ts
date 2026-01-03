import type { CollectionEntry } from "astro:content";
import isBlogPostPublished from "./isBlogPostPublished";

const getPostTimestampInSeconds = (post: CollectionEntry<"blog">) =>
  Math.floor(
    new Date(post.data.modDatetime ?? post.data.pubDatetime).getTime() / 1000
  );

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts
    .filter(isBlogPostPublished)
    .sort(
      (a, b) => getPostTimestampInSeconds(b) - getPostTimestampInSeconds(a)
    );
};

export default getSortedPosts;
