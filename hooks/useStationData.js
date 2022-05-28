import {
  selectCurrentStationData,
  selectAllLiveStatus,
} from "common/store/AppSlice";
import { useSelector } from "react-redux";

export const useStationData = (stationId = null) => {
  let currentStation = useSelector(selectCurrentStationData);
  let stationData = currentStation?.properties;
  const {
    name = "",
    station_id = "",
    short_name = "",
    ntaname = "",
    boroname = "",
  } = stationData ?? {};
  const stationNeighborhood = !ntaname ? "" : ntaname;
  return {
    ...stationData,
    stationNeighborhood,
  };
};
