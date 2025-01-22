import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { z } from 'zod'

import { env } from '@/env'
import { type HuxleyApiResponse } from '@/types/stations'

export const stationRouter = createTRPCRouter({
  getTrainsByCode: publicProcedure
    .input(
      z.object({
        stationCode: z.string(),
        board: z
          .enum(['departures', 'arrivals', 'all'])
          .optional()
          .default('all'),
        amount: z.number().optional().default(16)
      })
    )
    .query(async ({ input }): Promise<HuxleyApiResponse> => {
      const { board, stationCode, amount } = input

      try {
        const response = await fetch(
          env.HUXLEY_BASE_URL +
            `/${board}/${stationCode}/${amount}/?accessToken=${env.LDBWS_KEY}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch station data')
        }

        const stationData = (await response.json()) as HuxleyApiResponse

        return stationData
      } catch (error) {
        console.error('Error fetching station data:', error)
        throw new Error('Could not fetch station data')
      }
    })
})
