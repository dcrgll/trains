import BoardToggle from './board-toggle'
import CircularProgressBar from './progress'

export default function TrainBoardTabs({
  showDepartures,
  enableSwitching,
  setShowDepartures
}: {
  showDepartures: boolean
  enableSwitching: boolean
  setShowDepartures: (showDepartures: boolean) => void
}) {
  return (
    <div className="mb-4 flex items-center justify-between border-b border-t border-border bg-card py-3">
      <div className="flex w-full items-center justify-between space-x-2 px-4">
        <span className="items-center gap-2 text-2xl font-semibold">
          {showDepartures ? 'Departures' : 'Arrivals'}
        </span>

        {enableSwitching && (
          <div className="flex items-center space-x-4">
            <CircularProgressBar />

            <BoardToggle
              showDepartures={showDepartures}
              setShowDepartures={setShowDepartures}
            />
          </div>
        )}
      </div>
    </div>
  )
}
