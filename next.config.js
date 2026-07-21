/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js'
import { withEnvStyles } from 'env.style'

/** @type {import("next").NextConfig} */
const config = {
	allowedDevOrigins: ['trains.local', '*.trains.local'],
	compiler: {
		removeConsole: true
	},
	reactCompiler: true
}

export default withEnvStyles(config, {
	color: {
		development: '#3b82f6',
		preview: '#f59e0b',
		staging: '#6b7280'
	}
})
