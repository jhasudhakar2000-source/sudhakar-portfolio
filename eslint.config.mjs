import { FlatCompat } from "@eslint/eslintrc";
import { globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const config = [
  ...compat.extends("next/core-web-vitals"),
  prettier,
  globalIgnores([".next/**", "node_modules/**", "out/**"]),
];

export default config;
