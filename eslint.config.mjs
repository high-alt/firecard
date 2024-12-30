import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "indent": [ "error", 2, {
        "ignoredNodes": [ "ConditionalExpression", "ConditionalExpression *", "SwitchCase" ],
        "flatTernaryExpressions": true,
        "MemberExpression": "off"
      }],
      "import/no-anonymous-default-export": "off",
      "react/display-name": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["off"],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type":"off"
    }
  },
];

export default eslintConfig;
