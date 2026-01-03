# ToDo:

- use <Image> astro compoenet in mdx blogs we render
- whole subscribe service (build time trigger if new post detected during new deploymeent email is sent)

```bash
"scripts": {
    "copy:pagefind:dev": "npx shx cp -r dist/pagefind public/",
    "build:astro": "astro build",
    "build:pagefind": "npx pagefind",
    "build": "npm-run-all -s build:astro build:pagefind"
}
```

This will build the pagefind search index whenever you build your site. But, what about dev mode? Astro won't access files from your dist folder in dev mode, so you need to copy the pagefind files from the dist folder into your public directory (got the idea from this post) which is used for static files.

So, you can build the pagefind index, copy it from the dist to public directory and then run astro dev. This way you can get the latest search index but, it still won't change on hot reload (this is a limitation).

```bash
"scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build && pagefind --site dist && cp -r dist/pagefind public/",
    "preview": "astro preview",
    "sync": "astro sync",
    "astro": "astro",
    "format:check": "prettier --check .",
    "format": "prettier --write .",
    "lint": "eslint ."
  }
```

```jsx
Global mdx components
// src/mdx-components.ts
import Callout from "./components/Callout.astro";
import CodeBlock from "./components/CodeBlock.astro";

export const mdxComponents = {
  Callout,
  CodeBlock,
};
```
