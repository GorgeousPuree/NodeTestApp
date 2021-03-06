module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: "airbnb",
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    "no-console": "off",
    quotes: ["warn", "double"],
  },
  settings: {
    react: {
      version: "999.999.999",
    },
  },
};
