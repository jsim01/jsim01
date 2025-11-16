// Event-related type definitions

export interface Location {
  lat: number;
  lon: number;
  address?: string;
}

export interface TransitTrip {
  id: string;
  type: 'BUS' | 'SUBWAY' | 'TRAIN';
  lineName: string;
  routeId?: string;
  stationFrom: string;
  stationTo: string;
  departureTime: string; // ISO8601
  arrivalTime: string;   // ISO8601
}

export interface Event {
  id: string;
  userId: string;
  timestamp: string;        // ISO8601
  title: string | null;
  note: string | null;
  category: string | null;
  location: Location | null;
  transitTrips: TransitTrip[];
  createdAt: string;        // ISO8601
  updatedAt: string;        // ISO8601
}

export interface EventCreate {
  timestamp: string;
  title?: string | null;
  note?: string | null;
  category?: string | null;
  location?: Location | null;
  transitTrips?: TransitTrip[];
}

export interface EventUpdate {
  timestamp?: string;
  title?: string | null;
  note?: string | null;
  category?: string | null;
  location?: Location | null;
  transitTrips?: TransitTrip[];
}
