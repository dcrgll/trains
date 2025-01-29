'use client'

import { useEffect, useState } from 'react'
import { fetchCounterData, formatNumber } from './helpers'

export default function Counter() {
  const [visitCount, setVisitCount] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const data = await fetchCounterData()
      setVisitCount(data)
    }
    fetchData()
  }, [])

  const loading = visitCount === null

  if (loading || visitCount === undefined) {
    return null
  }

  return (
    <div className='flex items-center gap-1'>
      <span className='relative flex h-2 w-2'>
        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75' />
        <span className='relative inline-flex h-2 w-2 rounded-full bg-green-500' />
      </span>
      <p>{formatNumber(visitCount)} visits</p>
    </div>
  )
}
