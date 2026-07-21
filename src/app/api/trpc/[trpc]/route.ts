import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import type { NextRequest } from 'next/server'

import { env } from '@/env'
import { appRouter } from '@/server/api/root'
import { createTrpcContext } from '@/server/api/trpc'

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
function createContext(req: NextRequest) {
	return createTrpcContext({
		headers: req.headers
	})
}

function handler(req: NextRequest) {
	return fetchRequestHandler({
		createContext: () => createContext(req),
		endpoint: '/api/trpc',
		onError:
			env.NODE_ENV === 'development'
				? ({ path, error }) => {
						console.error(
							`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
						)
					}
				: undefined,
		req,
		router: appRouter
	})
}

export { handler as GET, handler as POST }
