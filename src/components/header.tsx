import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { type Station } from '@/types/stations'

import CurrentTime from './current-time'
import { Button } from './ui/button'

export default function TrainBoardHeader({
  station,
  currentTime
}: {
  station: Station
  currentTime: Date
}) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <Button variant="secondary" size="icon" className="mb-8" asChild>
          <Link href="/">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="w-full overflow-hidden truncate whitespace-break-spaces text-xl font-bold md:text-4xl">
          {station.label}
        </h1>
        <span className="font-mono font-bold text-muted-foreground">
          {station.value}
        </span>
      </div>
      <CurrentTime currentTime={currentTime} />
    </div>
  )
}
