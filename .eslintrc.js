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
    "space-before-function-paren": "off",
    "prettier/prettier": "error",
    "global-require": "off",
    "import/no-dynamic-require": "off",
    "no-tabs": "off",
    "no-console": "off",
    "comma-dangle": "off",
    "arrow-parens": "off",
    "implicit-arrow-linebreak": "off",
    "linebreak-style": ["error", "unix"],
    "operator-linebreak": "off",
    "function-paren-newline": "off",
    indent: "off",
    quotes: ["error", "backtick"],
    semi: ["error", "always"],
    "object-curly-newline": [
      "off",
      {
        ObjectExpression: "always",
        ObjectPattern: { multiline: true },
        ImportDeclaration: "never",
        ExportDeclaration: { multiline: true, minProperties: 3 }
      }
    ]
  }
};
