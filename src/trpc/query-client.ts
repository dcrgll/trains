import { QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query'
import superJson from 'superjson'

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 30 * 1000
      },
      dehydrate: {
        serializeData: superJson.serialize,
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending'
      },
      hydrate: {
        deserializeData: superJson.deserialize
      }
    }
  })
