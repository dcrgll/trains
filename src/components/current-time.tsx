import { Clock } from 'lucide-react'

export default function CurrentTime({ currentTime }: { currentTime: Date }) {
  return (
    <div className='flex h-full w-64 items-center justify-end space-x-4 rounded-lg px-4 py-2'>
      <Clock className='h-6 w-6 flex-shrink-0 text-primary lg:h-8 lg:w-8' />
      <span
        className='text-xl tabular-nums lg:text-3xl'
        suppressHydrationWarning
      >
        {currentTime.toLocaleTimeString()}
      </span>
    </div>
  )
}
