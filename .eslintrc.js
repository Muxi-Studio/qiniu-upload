module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: "airbnb",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "global-require": "off",
    "import/no-dynamic-require": "off",
    "no-tabs": "off",
    "no-console": "off",
    indent: ["error", "tab"],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"]
  }
};
