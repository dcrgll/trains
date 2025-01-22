import { redirect } from 'next/navigation'
import { api } from '@/trpc/server'

import { type Board, type CRSCode } from '@/types/stations'
import { stations } from '@/lib/stations'
import TrainTimesBoard from '@/app/_components/board'

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

  const data = await api.station.getTrainsByCode({
    stationCode: params.stationCode.toUpperCase(),
    board: params.board
  })

  const station = stations.find(
    (station) => station.crsCode === params.stationCode.toUpperCase()
  )

  if (!station) {
    return redirect('/')
  }

  return (
    <TrainTimesBoard
      station={station}
      data={data}
      enableSwitching={params.board === 'all'}
    />
  )
}
