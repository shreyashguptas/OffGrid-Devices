# Package manager (pnpm)

This repo is **pnpm-only**. Do not use `npm install`, `yarn`, or `bun` for dependencies.

## Setup

1. Use **Node 20+** (see `package.json` → `engines`).
2. Enable **Corepack** (ships with Node) so the pinned pnpm version from `packageManager` is used:
  ```bash
   corepack enable
  ```
3. Install dependencies:
  ```bash
   pnpm install
  ```

If someone runs `npm install`, the `preinstall` script should stop the install and ask for pnpm.

The `preinstall` script uses `npx only-allow pnpm` (the usual [only-allow](https://github.com/pnpm/only-allow) setup) so `only-allow` does not need to be a project dependency. That is the only place `npx` is expected in this workflow.

## Lockfile and CI

- Commit `**pnpm-lock.yaml**`. Do not commit `package-lock.json` or `yarn.lock` (they are gitignored).
- CI should run `pnpm install --frozen-lockfile` so installs match the lockfile.

## Common commands


| Task             | Command      |
| ---------------- | ------------ |
| Dev server       | `pnpm dev`   |
| Production build | `pnpm build` |
| Start prod build | `pnpm start` |
| Lint             | `pnpm lint`  |


## Native deps (pnpm 10)

`package.json` includes `pnpm.onlyBuiltDependencies` so packages like **sharp** can run install scripts. If a new dependency needs postinstall scripts, add it there or run `pnpm approve-builds` locally and merge the config it suggests.