import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    // Generated, gitignored build/coverage output — never lint it (mirrors
    // .gitignore so a local `eslint .` matches CI, which lints a clean tree).
    ".open-next/**",
    "coverage/**",
    ".claude/**",
    // Sibling worktrees check out other branches under this path; their
    // build artifacts should never be linted from here.
    ".worktrees/**",
    "next-env.d.ts",
  ]),
]);
