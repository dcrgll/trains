import { cn } from '@/lib/utils'

export default function BoardToggle({
	showDepartures,
	setShowDepartures
}: {
	showDepartures: boolean
	setShowDepartures: (showDepartures: boolean) => void
}) {
	return (
		<div className='flex items-center space-x-2'>
			<button
				aria-label='Show departures'
				type='button'
				onClick={() => setShowDepartures(!showDepartures)}
				disabled={showDepartures}
				className={cn(
					'h-3 w-3 rounded-full transition-colors duration-300',
					showDepartures ? 'bg-muted-foreground' : 'bg-muted'
				)}
			/>
			<button
				aria-label='Show arrivals'
				type='button'
				onClick={() => setShowDepartures(!showDepartures)}
				disabled={!showDepartures}
				className={cn(
					'h-3 w-3 rounded-full transition-colors duration-300',
					showDepartures ? 'bg-muted' : 'bg-muted-foreground'
				)}
			/>
		</div>
	)
}
