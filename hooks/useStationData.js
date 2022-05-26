import {
  selectCurrentStationData,
  selectAllLiveStatus,
} from "common/store/AppSlice";
import { useSelector } from "react-redux";

export const useStationData = (stationId = null) => {
  const allLiveStatus = useSelector(selectAllLiveStatus);
  let currentStation = useSelector(selectCurrentStationData);
  let stationData = currentStation?.properties;
  const { name, station_id, ntaname, boroname } = stationData;
  const stationNeighborhood = !ntaname ? "" : ntaname;
  return { name, station_id, ntaname, boroname, stationNeighborhood };
};
