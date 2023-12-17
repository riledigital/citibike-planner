import { useState } from "react";
import { StationStatus } from "common/Data/gbfs";
import useSWR from "swr";
const URL_CITIBIKE_LIVE_STATUS = `https://gbfs.citibikenyc.com/gbfs/en/station_status.json`;

export function useStationStatus(id: string) {
  const [stationMap, setStationMap] = useState<Map<string, StationStatus>>(
    new Map()
  );

  const swr = useSWR(new Date(), async () => {
    const response = await fetch(URL_CITIBIKE_LIVE_STATUS);
    const stations: StationStatus[] = await response.json();
    const stationMap = new Map<string, StationStatus>(
      stations.map((properties) => [properties.station_id, properties])
    );
    setStationMap(stationMap);
    return stationMap;
  });

  const stationStatus: StationStatus = stationMap?.get(id) ?? null;

  return { ...swr, stationStatus };
}
