import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import type { TrainService } from '@/types/stations'

export default function TrainBoardRows({
  filteredTrains,
  showDepartures
}: {
  filteredTrains: TrainService[]
  showDepartures: boolean
}) {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={showDepartures ? 'departures' : 'arrivals'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className='overflow-y-none'
      >
        {filteredTrains.map((train, index) => (
          <motion.div
            key={train.destination[0]?.crs + train.std}
            className='grid grid-cols-4 gap-4 border-b border-border p-3 last:border-b-0 md:grid-cols-5'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className='font-mono text-xl font-medium md:text-2xl'>
              {showDepartures ? train.std : train.sta}
            </div>
            <div className='col-span-2'>
              <div className='truncate text-xl font-medium md:text-2xl'>
                <Link
                  href={`/${train.destination[0]?.crs.toLowerCase()}/all`}
                  className='hover:underline'
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
                  train.etd?.toLowerCase().includes('delayed') && 'text-red-400'
                )}
              >
                {showDepartures ? train.etd : train.eta}
              </div>
            </div>
            <div className='flex justify-end text-xl font-medium md:justify-normal md:text-2xl'>
              {train.platform}
            </div>
            <div className='hidden truncate text-xl text-primary md:flex'>
              {train.operator}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
