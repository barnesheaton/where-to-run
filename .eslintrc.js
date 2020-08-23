module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      "jsx": true
    }
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/recommended',
    'prettier/vue',
    "plugin:prettier/recommended",
    'prettier',
  ],
  plugins: [
    'prettier'
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
      },
    ],
    "arrow-parens": 0,
    "generator-star-spacing": 0,
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
  },
};
