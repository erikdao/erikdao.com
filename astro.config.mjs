import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import astroExpressiveCode from 'astro-expressive-code';

/**
 * Expressive Code plugin: copy the block's language onto the rendered
 * <figure> element so the ChatGPT/Claude-style header bar can render the
 * label purely in CSS via `content: attr(data-language)`.
 */
function pluginLanguageBadge() {
  return {
    name: 'language-badge',
    hooks: {
      postprocessRenderedBlock: ({ codeBlock, renderData }) => {
        const root = renderData.blockAst;
        if (!root?.properties) return;
        const lang = codeBlock.language;
        root.properties['data-language'] =
          !lang || lang === 'plaintext' || lang === 'text' ? 'code' : lang;
      },
    },
  };
}

export default defineConfig({
  site: 'https://erikdao.com',
  integrations: [
    astroExpressiveCode({
      // Single dark theme → ChatGPT/Claude look on the light site.
      themes: ['github-dark'],
      // We render our own header bar; drop EC's editor/terminal chrome.
      defaultProps: { frame: 'none' },
      plugins: [pluginLanguageBadge()],
      styleOverrides: {
        borderRadius: '0.625rem',
        codeFontFamily:
          "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        codeFontSize: '0.875rem',
        codeLineHeight: '1.6',
      },
    }),
    sitemap(),
  ],
  markdown: {
    // Code blocks are handled by Expressive Code; Shiki config no longer needed.
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { throwOnError: true, strict: 'error' }]],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
