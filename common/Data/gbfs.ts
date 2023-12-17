/**
 * @see https://gbfs.citibikenyc.com/gbfs/2.3/gbfs.json
 * @see https://gbfs.org/specification/reference/#station_statusjson
 */
export interface StationStatus {
  eightd_has_available_keys: boolean;
  is_installed: number;
  is_renting: number;
  is_returning: number;
  last_reported: number;
  legacy_id: string;
  num_bikes_available: number;
  num_bikes_disabled: number;
  num_docks_available: number;
  num_docks_disabled: number;
  num_ebikes_available: number;
  num_scooters_available: number;
  num_scooters_unavailable: number;
  station_id: string;
  legacy_station_id: string;
}

export interface StationDataProperty {
  station_id: string;
  short_name: string;
  name: string;
  boroname: string;
  ntaname: string;
  ntacode_x: string;
  ntacode_y: string;
  station_rank: number | null;
  stations_count: number;
  geometry: unknown;
}
