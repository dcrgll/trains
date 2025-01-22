export type CRSCode = string

type Coach = {
  coachClass: string
  toilet: Toilet | null
  loading: number
  loadingSpecified: boolean
  number: string
}

type Toilet = {
  status: number
  value: string
}

type OriginDestination = {
  locationName: string
  crs: string
  via: string | null
  futureChangeTo: string | null
  assocIsCancelled: boolean
}

type TrainService = {
  formation: {
    avgLoading: number
    avgLoadingSpecified: boolean
    coaches: Coach[]
  }
  origin: OriginDestination[]
  destination: OriginDestination[]
  currentOrigins: null // Not sure what this is, assuming it's null in the response
  currentDestinations: null // Same assumption as above
  rsid: string | null
  serviceIdPercentEncoded: string
  serviceIdGuid: string
  serviceIdUrlSafe: string
  sta: string | null
  eta: string | null
  std: string
  etd: string
  platform: string
  operator: string
  operatorCode: string
  isCircularRoute: boolean
  isCancelled: boolean
  filterLocationCancelled: boolean
  serviceType: number
  length: number
  detachFront: boolean
  isReverseFormation: boolean
  cancelReason: string | null
  delayReason: string | null
  serviceID: string
  adhocAlerts: null // Assuming null or some structured data
}

export type HuxleyApiResponse = {
  trainServices: TrainService[]
  busServices: string | null
  ferryServices: string | null
  generatedAt: string
  locationName: string
  crs: string
  filterLocationName: string | null
  filtercrs: string | null
  filterType: number
  nrccMessages:
    | {
        value: string
      }[]
    | null
  platformAvailable: boolean
  areServicesAvailable: boolean
}

export type Station = {
  stationName: string
  crsCode: CRSCode
}

export type Board = 'departures' | 'arrivals' | 'all'
