/** @type {import('eslint').Linter.Config} */
const typescriptParser = require("@typescript-eslint/parser");

module.exports = [
	{
		ignores: ["node_modules/*", "dist/*"],
	},
	{
		files: ["**/*.ts", "**/*.js"],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: "module",
			},
		},
		plugins: {
			"@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
			prettier: require("eslint-plugin-prettier"),
		},
		rules: {
			"prettier/prettier": [
				"error",
				{
					endOfLine: "auto",
					useTabs: true,
					tabWidth: 4,
					singleQuote: false,
				},
			],
			"require-jsdoc": 0,
		},
	},
	{
		files: ["**/*.ts"],
		rules: {
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-unused-vars": "warn",
		},
	},
	{
		files: ["**/*.js"],
		rules: {
			"prettier/prettier": "warn",
		},
	},
];
