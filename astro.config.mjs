import { defineConfig, envField } from 'astro/config';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { loadEnv } from 'vite';
import { SITE } from './src/site.config';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import transformerFileName from './src/plugins/shiki-filename.js';
import rehypeExternalLinks from './src/plugins/rehype-external-links.js';
import remarkToc from 'remark-toc';
import remarkCollapse from 'remark-collapse';
import { mdxComponents } from './src/mdx-components';
const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), '');

export default defineConfig({
  site: PUBLIC_SITE_URL,

  integrations: [
    icon(),
    mdx({
      mdxComponents: mdxComponents,
    }),
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith('/archives'),
    }),
  ],

  markdown: {
    remarkPlugins: [
      [remarkToc, { maxDepth: 3, tight: true }],
      [remarkCollapse, { test: 'Table of contents' }],
    ],
    rehypePlugins: [rehypeExternalLinks],
    shikiConfig: {
      themes: { light: 'min-light', dark: 'night-owl' },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: 'v3' }),
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },

  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },

  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: 'public',
        context: 'client',
        optional: true,
      }),
      PUBLIC_SITE_URL: envField.string({
        access: 'public',
        context: 'server',
      }),
    },
  },

  experimental: {
    preserveScriptOrder: true,
  },
});
