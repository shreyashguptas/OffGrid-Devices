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
    ".claude/**",
    // Sibling worktrees check out other branches under this path; their
    // build artifacts should never be linted from here.
    ".worktrees/**",
    "next-env.d.ts",
  ]),
]);
