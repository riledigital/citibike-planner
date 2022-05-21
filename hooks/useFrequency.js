import {
  selectCurrentStation,
  selectAllStationFrequencyData,
} from "common/store/AppSlice";
import { useSelector } from "react-redux";

export const useFrequency = (stationId = null) => {
  let currentlySelectedId = useSelector(selectCurrentStation);
  let data = useSelector(selectAllStationFrequencyData);
  if (stationId) {
    data = data[stationId];
  } else {
    data = data[currentlySelectedId];
  }
  return {
    data,
  };
};
