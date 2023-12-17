export const URL_STATION_INFO = `/data/df_summary_hourly.json`;

import { useStationState } from "../common/MapState";
import useSWR from "swr";
import { useStationRanking } from "./useStationRanking";

interface HourData {
  short_name: string;
  start_hour: number;
  counts: number;
}

type HourlyData = Record<HourData["short_name"], HourData[]>;

export const useFrequency = (
  key: string = "test",
  stationId: string | null = null
) => {
  let { currentStationId } = useStationState();

  const { data: { stationAnalysis } = {} } = useStationRanking("0");

  const swr = useSWR(key, async () => {
    const response = await fetch(URL_STATION_INFO);
    const data: HourlyData = await response.json();
    const map = new Map<string, HourData[]>(Object.entries(data));
    return map;
  });

  const { data } = swr;
  let id = stationId ?? currentStationId;
  const { short_name } = stationAnalysis?.get(id) ?? {};
  const hourlyData = data?.get(short_name);

  return {
    hourlyData: id ? hourlyData : [],
  };
};
