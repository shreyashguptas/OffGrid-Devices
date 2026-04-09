This is a [Next.js](https://nextjs.org) project bootstrapped with `[create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app)`.

## Requirements

- **Node.js** 20.9 or newer (see `engines` in `package.json`)
- **pnpm** 10.x, pinned via the `packageManager` field (use [Corepack](https://nodejs.org/api/corepack.html): `corepack enable`)

This repository uses **pnpm only**. Do not use `npm install` or Yarn for dependencies; a `preinstall` check blocks accidental `npm install`. More detail: [docs/pnpm.md](docs/pnpm.md).

## Getting started

```bash
corepack enable
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

### Scripts


| Command         | Description           |
| --------------- | --------------------- |
| `pnpm dev`      | Development server    |
| `pnpm build`    | Production build      |
| `pnpm start`    | Run production server |
| `pnpm lint`     | ESLint                |
| `pnpm lint:fix` | ESLint with auto-fix  |


This project uses `[next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)` to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn more

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Vercel detects **pnpm** from `pnpm-lock.yaml` and uses the install command appropriate for this repo.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.