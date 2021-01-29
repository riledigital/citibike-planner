module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "prettier/react",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
<<<<<<< HEAD
    indent: ["error", 2],
=======
    "no-unused-vars": ["warn"],
    "no-debugger": ["warn"],
    "prettier/prettier": ["warn"],
    "react/jsx-key": ["warn"],
    "react/jsx-no-target-blank": ["warn"],
    "react/no-unescaped-entities": ["warn"],
    "react/prop-types": ["warn"],
    indent: ["warn", 2],
>>>>>>> feature/restyles
    "linebreak-style": ["error", "unix"],
    semi: ["error", "always"],
  },
};
