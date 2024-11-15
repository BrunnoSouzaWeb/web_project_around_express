import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default [
  ...compat.extends("airbnb-base"),
  {
    rules: {
      "no-underscore-dangle": ["error", { allow: ["_id"] }],
      "no-console": "off",
      "linebreak-style": "off",
      quotes: ["error", "double"],
    },
  },
];
