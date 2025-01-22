'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, Clock, Volume2 } from 'lucide-react'

import { type HuxleyApiResponse, type Station } from '@/types/stations'

type TrainInfo = {
  time: string
  destination: string
  platform: string
  status: string
  operator: string
}

const dummyDepartures: TrainInfo[] = [
  {
    time: '10:30',
    destination: 'London Euston',
    platform: '3',
    status: 'On time',
    operator: 'Avanti West Coast'
  },
  {
    time: '10:45',
    destination: 'Manchester Piccadilly',
    platform: '5',
    status: 'Delayed 5m',
    operator: 'TransPennine Express'
  },
  {
    time: '11:00',
    destination: 'Birmingham New Street',
    platform: '2',
    status: 'On time',
    operator: 'CrossCountry'
  },
  {
    time: '11:15',
    destination: 'Edinburgh Waverley',
    platform: '7',
    status: 'Cancelled',
    operator: 'LNER'
  },
  {
    time: '11:30',
    destination: 'Bristol Temple Meads',
    platform: '4',
    status: 'On time',
    operator: 'Great Western Railway'
  },
  {
    time: '11:45',
    destination: 'Southampton Central',
    platform: '6',
    status: 'On time',
    operator: 'South Western Railway'
  },
  {
    time: '12:00',
    destination: 'Norwich',
    platform: '1',
    status: 'On time',
    operator: 'Greater Anglia'
  },
  {
    time: '12:15',
    destination: 'York',
    platform: '8',
    status: 'Delayed 10m',
    operator: 'LNER'
  }
]

const dummyArrivals: TrainInfo[] = [
  {
    time: '10:35',
    destination: 'Glasgow Central',
    platform: '1',
    status: 'On time',
    operator: 'ScotRail'
  },
  {
    time: '10:50',
    destination: 'Leeds',
    platform: '6',
    status: 'Delayed 10m',
    operator: 'Northern'
  },
  {
    time: '11:05',
    destination: 'Liverpool Lime Street',
    platform: '4',
    status: 'On time',
    operator: 'Merseyrail'
  },
  {
    time: '11:20',
    destination: 'Newcastle',
    platform: '2',
    status: 'On time',
    operator: 'LNER'
  },
  {
    time: '11:35',
    destination: 'Cardiff Central',
    platform: '5',
    status: 'On time',
    operator: 'Transport for Wales'
  },
  {
    time: '11:50',
    destination: 'Brighton',
    platform: '3',
    status: 'On time',
    operator: 'Southern'
  },
  {
    time: '12:05',
    destination: 'Aberdeen',
    platform: '7',
    status: 'Delayed 15m',
    operator: 'ScotRail'
  },
  {
    time: '12:20',
    destination: 'Penzance',
    platform: '8',
    status: 'On time',
    operator: 'Great Western Railway'
  }
]

const announcements = [
  'Please mind the gap between the train and the platform edge.',
  'The next train to arrive at platform 3 will be the 10:30 service to London Euston.',
  'For your safety and comfort, please do not leave luggage unattended. Any unattended items may be removed without warning.',
  'We apologize for the delay to the 10:45 service to Manchester Piccadilly. This is due to a signalling problem.',
  'Smoking is not permitted anywhere on this station.',
  'The shop on platform 2 is now open for refreshments and newspapers.',
  'Ticket office queues are currently longer than usual. Please allow extra time for your journey.',
  'The 11:15 service to Edinburgh Waverley has been cancelled due to a train fault. We apologize for any inconvenience caused.'
]

const TrainIcon = ({ departing }: { departing: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`h-6 w-6 ${departing ? '' : 'rotate-180 transform'}`}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 10h18" />
    <path d="M7 15h2" />
    <path d="M15 15h2" />
    <path d="M3 6v5" />
    <path d="M21 6v5" />
  </svg>
)

export default function TrainTimesBoard({
  data,
  enableSwitching,
  station
}: {
  data: HuxleyApiResponse
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
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length)
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
  }, [enableSwitching])

  const trains = showDepartures ? dummyDepartures : dummyArrivals

  return (
    <div
      className={`min-h-screen w-full p-4 font-sans transition-colors duration-500 ${
        showDepartures ? 'bg-slate-900' : 'bg-gray-900'
      } flex flex-col text-gray-200`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="font-bold">{station.crsCode}</span>
            <h1 className="w-full overflow-hidden truncate whitespace-break-spaces text-4xl font-bold text-white">
              {station.stationName}
            </h1>
          </div>
          <div className="flex w-64 items-center justify-center space-x-4 rounded-lg bg-gray-800 px-4 py-2">
            <Clock className="h-8 w-8 flex-shrink-0 text-blue-400" />
            <span
              className="text-3xl tabular-nums text-white"
              suppressHydrationWarning
            >
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between rounded-lg border-b border-t border-gray-700 bg-gray-800 py-3">
          <div className="flex items-center space-x-2 px-4">
            <TrainIcon departing={showDepartures} />
            <span className="text-2xl font-semibold">
              {showDepartures ? 'Departures' : 'Arrivals'}
            </span>
          </div>
          <div className="flex items-center space-x-2 px-4">
            <AlertTriangle className="h-6 w-6 text-amber-400" />
            <span className="text-xl">Service Updates</span>
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
              {trains.map((train, index) => (
                <motion.div
                  key={index}
                  className="grid grid-cols-5 gap-4 border-b border-gray-700 p-3 last:border-b-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-2xl font-medium">{train.time}</div>
                  <div className="col-span-2">
                    <div className="truncate text-2xl font-medium">
                      {train.destination}
                    </div>
                    <div
                      className={`text-lg ${
                        train.status.toLowerCase().includes('on time')
                          ? 'text-green-400'
                          : train.status.toLowerCase().includes('cancelled')
                            ? 'text-red-400'
                            : 'text-amber-400'
                      }`}
                    >
                      {train.status}
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

        <div className="mt-4 rounded-lg border-b border-t border-gray-700 bg-gray-800 py-3">
          <div className="mb-2 flex items-center space-x-2 px-4">
            <Volume2 className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-semibold">Announcements</span>
          </div>
          <motion.p
            key={currentAnnouncement}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="px-4 text-lg"
          >
            {announcements[currentAnnouncement]}
          </motion.p>
        </div>
      </div>
    </div>
  )
}
