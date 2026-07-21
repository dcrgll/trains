export type CrsCode = string

interface Coach {
	coachClass: string
	toilet: Toilet | null
	loading: number
	loadingSpecified: boolean
	number: string
}

interface Toilet {
	status: number
	value: string
}

interface OriginDestination {
	locationName: string
	crs: string
	via: string | null
	futureChangeTo: string | null
	assocIsCancelled: boolean
}

export interface TrainService {
	formation: {
		avgLoading: number
		avgLoadingSpecified: boolean
		coaches: Coach[]
	}
	origin: OriginDestination[]
	destination: OriginDestination[]
	// Not sure what this is, assuming it's null in the response.
	currentOrigins: null
	// Same assumption as above.
	currentDestinations: null
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
	// Assuming null or some structured data.
	adhocAlerts: null
}

export interface HuxleyApiResponse {
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

export interface Station {
	label: string
	value: CrsCode
}

export type Board = 'departures' | 'arrivals' | 'all'

export interface FilteredTrains {
	arrivals: TrainService[]
	departures: TrainService[]
	nrccMessages: HuxleyApiResponse['nrccMessages']
}
