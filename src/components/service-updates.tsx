import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

import type { FilteredTrains } from '@/types/stations'

export default function ServiceUpdates({
  filteredTrains,
  currentAnnouncement
}: {
  filteredTrains: FilteredTrains
  currentAnnouncement: number
}) {
  if (!filteredTrains?.nrccMessages) {
    return null
  }

  return (
    <div className='mt-4 rounded-lg border-b border-t border-border bg-card py-3'>
      <div className='flex items-center space-x-2 px-4'>
        <AlertTriangle className='h-6 w-6 text-amber-400' />
        <span className='text-xl'>Service Updates</span>
      </div>
      <motion.div
        key={currentAnnouncement}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className='my-2 px-4 text-lg'
      >
        <span
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <Announcement value is in html>
          dangerouslySetInnerHTML={{
            __html:
              filteredTrains?.nrccMessages?.[currentAnnouncement]?.value ?? ''
          }}
        />
      </motion.div>
    </div>
  )
}
