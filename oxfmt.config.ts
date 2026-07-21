import { defineConfig } from 'oxfmt'
import ultracite from 'ultracite/oxfmt'

export default defineConfig({
	...ultracite,
	ignorePatterns: [
		...(ultracite.ignorePatterns ?? []),
		'.vscode/settings.json',
		'README.md',
		'components.json',
		'next.config.js',
		'postcss.config.js',
		'public/site.webmanifest',
		'src/**',
		'tailwind.config.ts',
		'tsconfig.json'
	],
	jsDoc: true,
	jsxSingleQuote: true,
	printWidth: 80,
	semi: false,
	singleQuote: true,
	sortImports: true,
	sortPackageJson: true,
	sortTailwindcss: true,
	trailingComma: 'none',
	useTabs: true
})
