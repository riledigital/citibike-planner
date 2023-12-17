import { useState } from "react";
import { StationStatus } from "common/Data/gbfs";
import useSWR from "swr";
const URL_CITIBIKE_LIVE_STATUS = `https://gbfs.citibikenyc.com/gbfs/en/station_status.json`;

export function useStationStatus(key: string) {
  const [stationMap, setStationMap] = useState<Map<string, StationStatus>>(
    new Map()
  );

  const swr = useSWR(key, async () => {
    const response = await fetch(URL_CITIBIKE_LIVE_STATUS);
    const stations: StationStatus[] = (await response.json()).data.stations;
    const stationMap = new Map<string, StationStatus>(
      stations.map((properties) => [properties.legacy_id, properties])
    );
    return stationMap;
  });

  return swr;
}
