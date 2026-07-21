import { QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query'
import { deserialize, serialize } from 'superjson'

export function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			dehydrate: {
				serializeData: serialize,
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) || query.state.status === 'pending'
			},
			hydrate: {
				deserializeData: deserialize
			},
			queries: {
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				staleTime: 30 * 1000
			}
		}
	})
}
