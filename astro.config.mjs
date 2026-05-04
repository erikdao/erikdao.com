import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://erikdao.com',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light' },
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { throwOnError: true, strict: 'error' }]],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
