import { StationStatus } from "common/Data/gbfs";
import useSWR from "swr";
import { FeatureCollection, Geometry } from "geojson";

const URL_DATA_ANALYSIS = "/data/station_geo_ranked.geojson";

export interface StationAnalysis {
  station_id: string;
  short_name: string;
  name: string;
  boroname: string;
  ntaname: string;
  ntacode_x: string;
  station_rank: number;
  stations_count: number;
}

export function useStationRanking(key) {
  return useSWR(key, async () => {
    const response = await fetch(URL_DATA_ANALYSIS);
    /** Pass this to map library */
    const geojson: FeatureCollection<
      Geometry,
      StationAnalysis
    > = await response.json();
    const stationAnalysis = new Map<string, StationAnalysis>(
      geojson.features.map(({ properties }) => [
        properties.station_id,
        properties,
      ])
    );
    return { stationAnalysis, geojson };
  });
}
