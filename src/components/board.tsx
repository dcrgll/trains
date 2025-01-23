'use client'

import { useEffect, useState } from 'react'
import { api } from '@/trpc/react'

import { type Board, type FilteredTrains, type Station } from '@/types/stations'
import { filterTrainServices } from '@/lib/utils'

import TrainBoardRows from './board-rows'
import TrainBoardTabs from './board-tabs'
import TrainBoardHeader from './header'
import ServiceUpdates from './service-updates'

export default function TrainTimesBoard({
  trains,
  board,
  station
}: {
  trains: FilteredTrains
  station: Station
  board: Board
}) {
  const enableSwitching = board === 'all'
  const utils = api.useUtils()
  const [latestTrains] = api.station.getTrainsByCode.useSuspenseQuery({
    stationCode: station.value,
    board: board
  })

  const [displayedTrains, setDisplayedTrains] = useState<FilteredTrains>(trains)
  const [showDepartures, setShowDepartures] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0)

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const announcementTimer = setInterval(() => {
      if (trains?.nrccMessages?.length === 0) return

      setCurrentAnnouncement(
        (prev) => (prev + 1) % (trains?.nrccMessages?.length ?? 1)
      )
    }, 10000)

    let modeTimer: NodeJS.Timeout | null = null
    if (enableSwitching) {
      modeTimer = setInterval(() => {
        setShowDepartures((prev) => !prev)
      }, 15000)
    }

    return () => {
      clearInterval(clockTimer)
      clearInterval(announcementTimer)
      if (modeTimer) clearInterval(modeTimer)
    }
  }, [enableSwitching, trains?.nrccMessages?.length])

  useEffect(() => {
    const fetchInterval = setInterval(() => {
      console.log('Fetching new train data')
      try {
        console.log(latestTrains)
        setDisplayedTrains(filterTrainServices(latestTrains, board))
        utils.station.invalidate().catch((error) => {
          console.error('Failed to invalidate station data:', error)
        })
      } catch (error) {
        console.error('Failed to fetch train data:', error)
      }
    }, 30000)

    return () => clearInterval(fetchInterval)
  }, [latestTrains, station.value, board, utils])

  const filteredTrains = showDepartures
    ? displayedTrains.departures
    : displayedTrains.arrivals

  return (
    <div
      className={`flex min-h-[calc(100vh-4rem)] w-full flex-col bg-background p-4 transition-colors duration-500`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col">
        <TrainBoardHeader station={station} currentTime={currentTime} />

        <TrainBoardTabs
          showDepartures={showDepartures}
          enableSwitching={enableSwitching}
          setShowDepartures={setShowDepartures}
        />

        <div className="mb-2 grid grid-cols-4 gap-4 rounded-t-lg p-3 text-lg font-bold md:grid-cols-5">
          <div>Time</div>
          <div className="col-span-2">Destination</div>

          <div className="flex justify-end md:justify-normal">Platform</div>
          <div className="hidden md:flex">Operator</div>
        </div>

        <div className="flex-grow overflow-y-hidden rounded-b-lg bg-card">
          <TrainBoardRows
            filteredTrains={filteredTrains}
            showDepartures={showDepartures}
          />
        </div>

        <ServiceUpdates
          filteredTrains={trains}
          currentAnnouncement={currentAnnouncement}
        />
      </div>
    </div>
  )
}
