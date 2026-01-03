import type { RehypePlugin } from '@astrojs/markdown-remark';
import { visit } from 'unist-util-visit';
import type { Element } from 'hast';

const rehypeExternalLinks = (): RehypePlugin => {
  return tree => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'a' && node.properties?.href) {
        const href =
          typeof node.properties.href === 'string'
            ? node.properties.href
            : Array.isArray(node.properties.href)
              ? String(node.properties.href[0] || '')
              : String(node.properties.href || '');

        // Skip anchor links (same-page navigation)
        if (href && href.startsWith('#')) {
          return;
        }

        // Add target="_blank" and rel="noopener noreferrer" for security
        node.properties.target = '_blank';
        node.properties.rel = 'noopener noreferrer';
      }
    });
  };
};

export default rehypeExternalLinks;
