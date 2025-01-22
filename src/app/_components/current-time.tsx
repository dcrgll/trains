import { Clock } from 'lucide-react'

export default function CurrentTime({ currentTime }: { currentTime: Date }) {
  return (
    <div className="flex h-full w-64 items-center justify-end space-x-4 rounded-lg px-4 py-2">
      <Clock className="text-primary h-8 w-8 flex-shrink-0" />
      <span className="text-3xl tabular-nums" suppressHydrationWarning>
        {currentTime.toLocaleTimeString()}
      </span>
    </div>
  )
}
