# Astro Migration Design Spec

Migrate erikdao.com from Eleventy v2 + Tailwind v3 to Astro + Tailwind v4. Faithful visual migration — same design, same URLs, same Cloudflare Pages deployment. No redesign.

## Current Stack

- Eleventy v2 (CommonJS)
- Tailwind CSS v3 (manual parallel build)
- Nunjucks templates
- highlight.js v11.6 from CDN
- KaTeX via custom 11ty filter
- markdown-it + markdown-it-implicit-figures
- moment.js for date formatting
- html-minifier (unmaintained)
- clean-css-cli as separate build step
- Disqus comments
- ~12 posts across 4 categories (dev, machine-learning, life, violin)

## Target Stack

- Astro (static output)
- Tailwind CSS v4 (integrated via @astrojs/tailwind)
- Astro components (replacing Nunjucks)
- Shiki (built-in, replaces CDN highlight.js)
- remark-math + rehype-katex (replaces custom KaTeX filter)
- rehype-figure (replaces markdown-it-implicit-figures)
- Native Intl.DateTimeFormat (replaces moment.js)
- Astro built-in HTML/CSS minification (replaces html-minifier + clean-css-cli)
- @astrojs/sitemap
- Disqus comments (kept as-is)

## Project Structure

```
src/
  content/
    config.ts
    dev/               # existing markdown files
    machine-learning/
    life/
    violin/
  layouts/
    Base.astro
    Post.astro
  components/
    SiteHeader.astro
    SiteFooter.astro
    MetaInfo.astro
    PostList.astro
    FeaturedPosts.astro
    FeedHeader.astro
    PageHeader.astro
  pages/
    index.astro
    about.astro
    books.astro
    dev/index.astro
    dev/[slug].astro
    machine-learning/index.astro
    machine-learning/[slug].astro
    life/index.astro
    life/[slug].astro
    violin/index.astro
    violin/[slug].astro
  data/
    site.json
    navigation.json
    books.json
    todo100.json
  styles/
    global.css
public/
  images/              # moved from src/images/
  resources/           # moved from src/resources/
  favicon.ico
astro.config.mjs
                       # No tailwind.config.ts — Tailwind v4 uses CSS-based config via @theme
tsconfig.json
package.json
```

## Dependency Changes

### Removed

| Package | Reason |
|---------|--------|
| @11ty/eleventy | Replaced by astro |
| html-minifier | Astro minifies HTML in production |
| clean-css-cli | Astro/Vite handles CSS minification |
| moment | Replaced by native Intl.DateTimeFormat |
| markdown-it | Astro uses remark/rehype |
| markdown-it-implicit-figures | Replaced by rehype-figure |
| postcss, postcss-cli, autoprefixer | Tailwind v4 doesn't need PostCSS |
| concurrently | Astro dev server is single-process |
| rimraf, glob, lru-cache, fsevents | No longer needed |

### Added

| Package | Purpose |
|---------|---------|
| astro | Framework |
| @astrojs/tailwind | Tailwind integration |
| tailwindcss v4 | Upgraded from v3 |
| @astrojs/sitemap | Sitemap generation |
| remark-math | Parse $$math$$ in Markdown |
| rehype-katex | Render KaTeX output |
| katex | Kept — peer dep of rehype-katex |
| rehype-figure | Implicit figures for images |

### Scripts

```json
{
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview"
}
```

## Content Migration

### Frontmatter

Existing frontmatter stays the same except `layout` is removed. Layouts are applied by the `[slug].astro` page routes, not by the Markdown file.

Before:
```yaml
---
title: 'Post Title'
date: '2024-01-15'
tags: ['dev']
featured: true
summary: "Description"
socialImage: '/images/path.png'
layout: 'layouts/post.html'
---
```

After:
```yaml
---
title: 'Post Title'
date: '2024-01-15'
tags: ['dev']
featured: true
summary: "Description"
socialImage: '/images/path.png'
---
```

### Content Collection Schema

`src/content/config.ts`:
```ts
import { defineCollection, z } from 'astro:content';

const postCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().optional().default(false),
    summary: z.string(),
    socialImage: z.string().optional(),
  }),
});

export const collections = {
  dev: postCollection,
  'machine-learning': postCollection,
  life: postCollection,
  violin: postCollection,
};
```

### Featured Posts

No separate collection. Queried at render time by filtering `featured: true` across all collections.

### Math Rendering

`remark-math` + `rehype-katex` replaces the custom 11ty `latex` filter. The `$$equation$$` syntax in Markdown files stays identical.

### Implicit Figures

`rehype-figure` replaces `markdown-it-implicit-figures`. Images in Markdown auto-wrapped in `<figure>` tags as before.

## Template Conversion

### Base Layout (Base.astro)

Translates `base.html`:
- Nunjucks `{% block %}` / `{% extends %}` becomes Astro `<slot />` pattern
- highlight.js CDN removed — Shiki built-in handles syntax highlighting (zero client JS)
- CSS loaded via Astro asset pipeline
- Props: `title`, `description`, `socialImage`

### Post Layout (Post.astro)

Wraps `Base.astro`:
- Renders article header (title, date, tags)
- `<slot />` for post content
- Disqus embed script at the bottom (kept as-is)

### Components

Each Nunjucks partial becomes an `.astro` component:

| Nunjucks partial | Astro component |
|-----------------|-----------------|
| partials/site-header.html | SiteHeader.astro |
| partials/site-footer.html | SiteFooter.astro |
| partials/meta-info.html | MetaInfo.astro |
| partials/post-list.html | PostList.astro |
| partials/featured-posts.html | FeaturedPosts.astro |
| partials/feed-header.html | FeedHeader.astro |
| partials/page-header.html | PageHeader.astro |

Conversion patterns:
- `{% if %}` → `{condition && (<markup>)}` or ternary
- `{% for item in items %}` → `{items.map(item => (<markup>))}`
- `{% include "partials/foo.html" %}` → `<Foo />` import
- Template variables → `Astro.props`

### Page Routes

Each category gets a `[slug].astro` with `getStaticPaths()`:

```astro
---
import { getCollection } from 'astro:content';
import Post from '../../layouts/Post.astro';

export async function getStaticPaths() {
  const posts = await getCollection('dev');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---
<Post frontmatter={post.data}>
  <Content />
</Post>
```

Category index pages query the collection, sort reverse by date, render the post list.

## Build & Deploy

### Astro Config

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://erikdao.com',
  integrations: [tailwind(), sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light' },
    remarkPlugins: ['remark-math'],
    rehypePlugins: ['rehype-katex'],
  },
  output: 'static',
});
```

### Cloudflare Pages

- Output is `static` — no adapter needed
- Build command: `yarn build`
- Output directory: `dist/` (same as before, no Cloudflare config change)

### Environment Handling

`src/_data/env.js` removed. Replaced by:
- `astro.config.mjs` `site` field for production URL
- `import.meta.env.PROD` / `import.meta.env.DEV` for conditional logic
- Google Analytics tracking ID checked against `import.meta.env.PROD`

### Dev Server

Single command: `yarn dev`. Astro's Vite-based dev server handles Tailwind, HMR, and everything in one process.

## URL Preservation

All existing URLs must be preserved:
- `/dev/<slug>/`
- `/machine-learning/<slug>/`
- `/life/<slug>/`
- `/violin/<slug>/`
- `/about/`
- `/books/`
- Category index pages at `/dev/`, `/machine-learning/`, `/life/`, `/violin/`

Astro's file-based routing with `[slug].astro` in each category directory produces the same URL structure.

## What Stays the Same (User Perspective)

- All existing URLs preserved
- Same visual design, same Tailwind classes
- Same Markdown authoring workflow (create .md, add frontmatter, place images)
- Same Cloudflare Pages deployment
- Disqus comments work identically
- $$math$$ syntax unchanged
- Image implicit figures unchanged
