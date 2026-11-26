# Mohammad Ezzeddin Pratama — Portfolio

Next.js 16 portfolio, technical blog, and certifications. The interface uses a shared Apple-inspired visual system with responsive layouts, dark mode, and reduced-motion support.

## Development

Requires Node.js 20.9 or newer (20–24) and npm.

```sh
npm ci
npm run dev
```

Use the Local URL printed by Next.js. A server already running in this checkout can be reused.

## Checks

```sh
npm run typecheck
npm test
npm run build
npm run start
```

`npm test` covers article lookup, legacy URLs, pagination, author validation, upstream failures, local covers, and optional comments. `npm run lint` uses the ESLint CLI and the matching Next.js flat configuration.

## Content

- Projects: `src/components/blocks/ui/expandable-card-data.tsx`. The selected projects are Skyline, ConsumerIQ, SehatSantap, and Matani App. Old project detail URLs return 404.
- Certifications: `src/common/constants/certifications.ts`. LinkedIn content is curated from the owner's supplied profile text. Entries issued before 2024 have been removed.
- Shared appearance: `src/app/portfolio.css`.
- Project images: `public/skyline.jpg`, `public/consumeriq.jpg`, and the retained galleries in `src/images/project/`.
- Published articles and fallback catalog: `src/content/blog.json`.
- Original article cover images: `public/blog/`.

Refresh the verified article snapshot and original cover images before deploying content updates:

```sh
npm run sync:blog
npm run build
```

The refresh uses public DEV Community endpoints for `ezzeddinp`. It validates the author and article bodies before saving the snapshot. No DEV API key is required. Cover downloads are limited to supported image formats and 2 MB per image.

## Rendering and availability

Home, Education, retained project details, and known blog articles are pre-rendered. New articles can be generated on demand. DEV responses and article routes revalidate hourly, and metadata/page reads share request-scoped lookups.

The listing is rendered on the server, with search and grid/list controls in the browser. Series articles remain visible. Article links use the full DEV slug; old shortened links redirect permanently to the canonical URL.

If DEV is temporarily unavailable, known articles use the verified snapshot. Explicit upstream 404 responses are respected. Optional comments have a three-second timeout and stream independently of the article. Known cover images are served locally through Next Image to avoid an extra external image fetch on first view.

Portfolio content has no mandatory environment variables. On Vercel, Analytics and Speed Insights are enabled through the platform's `VERCEL` environment flag. Optional search verification uses `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.

## Verification scope

Local production browser checks cover Home, Education, all published article routes, project details, search, view persistence, canonical redirects, missing routes, mobile overflow, dark mode, and server-rendered content with JavaScript disabled. Live hosting performance depends on the deployment and visitor network; local timings are not a production Lighthouse score.
