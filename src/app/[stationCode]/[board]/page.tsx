import { api } from '@/trpc/server'
import { redirect } from 'next/navigation'

import TrainTimesBoard from '@/components/board'
import { stations } from '@/lib/stations'
import { filterTrainServices } from '@/lib/utils'
import type { Board, CrsCode } from '@/types/stations'

interface PageProps {
  params: Promise<{
    stationCode: CrsCode
    board: Board
  }>
}

export default async function BoardPage(props: PageProps) {
  const params = await props.params

  if (!params.board) {
    return redirect('/')
  }

  const station = stations.find(
    station => station.value === params.stationCode.toUpperCase()
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
    <TrainTimesBoard station={station} trains={trains} board={params.board} />
  )
}
