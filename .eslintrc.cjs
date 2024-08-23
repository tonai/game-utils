module.exports = {
  extends: ["plugin:smile/ts"],
  parserOptions: {
    project: ["./tsconfig.json", "./tsconfig.node.json"],
  },
  rules: {
    "@typescript-eslint/no-invalid-void-type": "off",
  },
};
