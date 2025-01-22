'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

import { type FilteredTrains, type Station } from '@/types/stations'
import { cn } from '@/lib/utils'

import CurrentTime from './current-time'

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
      className={`flex min-h-screen w-full flex-col bg-gray-900 p-4 font-sans text-gray-200 transition-colors duration-500`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="font-bold">{station.crsCode}</span>
            <h1 className="w-full overflow-hidden truncate whitespace-break-spaces text-xl font-bold text-white md:text-4xl">
              {station.stationName}
            </h1>
          </div>
          <CurrentTime currentTime={currentTime} />
        </div>

        <div className="mb-4 flex items-center justify-between rounded-lg border-b border-t border-gray-700 bg-gray-800 py-3">
          <div className="flex w-full items-center justify-between space-x-2 px-4">
            <span className="text-2xl font-semibold">
              {showDepartures ? 'Departures' : 'Arrivals'}
            </span>

            {enableSwitching && (
              <div className="flex items-center space-x-2">
                {/* Indicator Circles */}
                <div
                  className={cn(
                    'h-3 w-3 rounded-full transition-colors duration-300',
                    showDepartures ? 'bg-blue-300' : 'bg-gray-600'
                  )}
                ></div>
                <div
                  className={cn(
                    'h-3 w-3 rounded-full transition-colors duration-300',
                    !showDepartures ? 'bg-blue-300' : 'bg-gray-600'
                  )}
                ></div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-2 grid grid-cols-5 gap-4 rounded-t-lg bg-gray-800 p-3 text-lg font-bold">
          <div>Time</div>
          <div className="col-span-2">Destination</div>

          <div>Platform</div>
          <div>Operator</div>
        </div>

        <div className="flex-grow overflow-y-hidden rounded-b-lg bg-gray-800 bg-opacity-50">
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
                  className="grid grid-cols-5 gap-4 border-b border-gray-700 p-3 last:border-b-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-2xl font-medium">
                    {showDepartures ? train.std : train.sta}
                  </div>
                  <div className="col-span-2">
                    <div className="truncate text-2xl font-medium">
                      {train.destination[0]?.locationName}
                    </div>

                    <div
                      className={cn(
                        'text-lg text-amber-400',
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
                  <div className="text-2xl font-medium">{train.platform}</div>
                  <div className="truncate text-xl text-blue-300">
                    {train.operator}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {trains?.nrccMessages && (
          <div className="mt-4 rounded-lg border-b border-t border-gray-700 bg-gray-800 py-3">
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
