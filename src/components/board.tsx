'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, ArrowLeft } from 'lucide-react'

import { type FilteredTrains, type Station } from '@/types/stations'
import { cn } from '@/lib/utils'

import BoardToggle from './board-toggle'
import CurrentTime from './current-time'
import { Button } from './ui/button'

export default function TrainTimesBoard({
  trains,
  enableSwitching,
  station
}: {
  trains: FilteredTrains
  station: Station
  enableSwitching: boolean
}) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableSwitching])

  const filteredTrains = showDepartures ? trains.departures : trains.arrivals

  return (
    <div
      className={`flex min-h-[calc(100vh-4rem)] w-full flex-col bg-background p-4 transition-colors duration-500`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <Button variant="secondary" size="icon" className="mb-8" asChild>
              <Link href="/">
                <ArrowLeft />
              </Link>
            </Button>
            <h1 className="w-full overflow-hidden truncate whitespace-break-spaces text-xl font-bold md:text-4xl">
              {station.stationName}
            </h1>
            <span className="font-mono font-bold text-muted-foreground">
              {station.crsCode}
            </span>
          </div>
          <CurrentTime currentTime={currentTime} />
        </div>

        <div className="mb-4 flex items-center justify-between border-b border-t border-border bg-card py-3">
          <div className="flex w-full items-center justify-between space-x-2 px-4">
            <span className="text-2xl font-semibold">
              {showDepartures ? 'Departures' : 'Arrivals'}
            </span>

            {enableSwitching && (
              <BoardToggle
                showDepartures={showDepartures}
                setShowDepartures={setShowDepartures}
              />
            )}
          </div>
        </div>

        <div className="mb-2 grid grid-cols-4 gap-4 rounded-t-lg p-3 text-lg font-bold md:grid-cols-5">
          <div>Time</div>
          <div className="col-span-2">Destination</div>

          <div className="flex justify-end md:justify-normal">Platform</div>
          <div className="hidden md:flex">Operator</div>
        </div>

        <div className="flex-grow overflow-y-hidden rounded-b-lg bg-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={showDepartures ? 'departures' : 'arrivals'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="overflow-y-none"
            >
              {filteredTrains.map((train, index) => (
                <motion.div
                  key={index}
                  className="grid grid-cols-4 gap-4 border-b border-border p-3 last:border-b-0 md:grid-cols-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="font-mono text-xl font-medium md:text-2xl">
                    {showDepartures ? train.std : train.sta}
                  </div>
                  <div className="col-span-2">
                    <div className="truncate text-xl font-medium md:text-2xl">
                      <Link
                        href={`/${train.destination[0]?.crs.toLowerCase()}/all`}
                        className="hover:underline"
                      >
                        {train.destination[0]?.locationName}
                      </Link>
                    </div>

                    <div
                      className={cn(
                        'text-base text-amber-400 md:text-lg',
                        train.eta?.toLowerCase().includes('on time') &&
                          'text-green-400',
                        train.eta?.toLowerCase().includes('cancelled') &&
                          'text-red-400',
                        train.eta?.toLowerCase().includes('delayed') &&
                          'text-red-400',
                        train.etd?.toLowerCase().includes('on time') &&
                          'text-green-400',
                        train.etd?.toLowerCase().includes('cancelled') &&
                          'text-red-400',
                        train.etd?.toLowerCase().includes('delayed') &&
                          'text-red-400'
                      )}
                    >
                      {showDepartures ? train.etd : train.eta}
                    </div>
                  </div>
                  <div className="flex justify-end text-xl font-medium md:justify-normal md:text-2xl">
                    {train.platform}
                  </div>
                  <div className="hidden truncate text-xl text-primary md:flex">
                    {train.operator}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {trains?.nrccMessages && (
          <div className="mt-4 rounded-lg border-b border-t border-border bg-card py-3">
            <div className="flex items-center space-x-2 px-4">
              <AlertTriangle className="h-6 w-6 text-amber-400" />
              <span className="text-xl">Service Updates</span>
            </div>
            <motion.div
              key={currentAnnouncement}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="my-2 px-4 text-lg"
            >
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    trains?.nrccMessages?.[currentAnnouncement]?.value ?? ''
                }}
              ></span>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
