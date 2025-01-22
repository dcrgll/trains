import { redirect } from 'next/navigation'
import { api } from '@/trpc/server'

import { type Board, type CRSCode } from '@/types/stations'
import { stations } from '@/lib/stations'
import { filterTrainServices } from '@/lib/utils'
import TrainTimesBoard from '@/components/board'

interface PageProps {
  params: Promise<{
    stationCode: CRSCode
    board: Board
  }>
}

export default async function BoardPage(props: PageProps) {
  const params = await props.params

  if (!params.board) {
    return redirect('/')
  }

  const station = stations.find(
    (station) => station.crsCode === params.stationCode.toUpperCase()
  )

  if (!station) {
    return redirect('/')
  }

  const data = await api.station.getTrainsByCode({
    stationCode: params.stationCode.toUpperCase(),
    board: params.board
  })

  const trains = filterTrainServices(data, params.board)

  return (
    <TrainTimesBoard
      station={station}
      trains={trains}
      enableSwitching={params.board === 'all'}
    />
  )
}
