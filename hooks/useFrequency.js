import {
  selectCurrentStationData,
  selectCurrentStation,
  selectAllStationFrequencyData,
} from "common/store/AppSlice";
import { useSelector } from "react-redux";

export const useFrequency = (stationId = null) => {
  let currentStation = useSelector(selectCurrentStationData);
  // let currentlySelectedId = useSelector(selectCurrentStation);
  const short_name = currentStation?.properties?.short_name;
  let data = useSelector(selectAllStationFrequencyData);
  if (stationId) {
    data = data[stationId] ?? [];
  } else {
    if (short_name) {
      data = data?.[short_name];
    } else {
      data = [];
    }
  }

  return {
    data,
  };
};
