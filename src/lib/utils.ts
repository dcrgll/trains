import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { Board, FilteredTrains, HuxleyApiResponse } from '@/types/stations'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterTrainServices(
  apiResponse: HuxleyApiResponse,
  board: Board
): FilteredTrains {
  const { trainServices, nrccMessages } = apiResponse

  if (!trainServices) {
    return { arrivals: [], departures: [], nrccMessages: [] } // No train services available
  }

  const arrivals = trainServices.filter(
    service => service.sta !== null || service.eta !== null
  )
  const departures = trainServices.filter(
    service => service.std !== null || service.etd !== null
  )

  if (board === 'arrivals') {
    return { arrivals, departures: [], nrccMessages }
  }

  if (board === 'departures') {
    return { arrivals: [], departures, nrccMessages }
  }

  return { arrivals, departures, nrccMessages }
}
