module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    "browser": true,
    "es2020": true,
    "jquery": true,
  },
  rules: {
    "no-undef": "off"
  }
};