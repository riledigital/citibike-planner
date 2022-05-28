import {
  selectCurrentStationData,
  selectAllStationInfo,
} from "common/store/AppSlice";
import { useSelector } from "react-redux";

// if not null, select ALL station data
export const useStationData = (shortName = null) => {
  let currentStation = useSelector(selectCurrentStationData);
  let allStationInfo = useSelector(selectAllStationInfo);

  let stationData = shortName
    ? allStationInfo.find(
        ({ properties: { short_name } }) => short_name === shortName
      )?.properties
    : currentStation?.properties;
  
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
