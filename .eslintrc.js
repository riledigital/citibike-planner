module.exports = {
  extends: ["next", "next/core-web-vitals", "eslint:recommended", "prettier"],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "no-unused-vars": ["off"],
  },
};
