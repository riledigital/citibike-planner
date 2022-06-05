import {
  selectShortName,
} from "common/store/AppSlice";
import {useGetStationGeoJsonQuery} from "common/store/CBServer";
import { useSelector } from "react-redux";

// if not null, select ALL station data
export const useStationData = (shortName = null) => {
  let short_name_state = useSelector(selectShortName);
  let short_name = shortName ?? short_name_state;
  
  const { data } = useGetStationGeoJsonQuery();
  
  console.log("data", data);
  let stationData = {};
  if (data) {
    stationData = data?.[short_name] ?? {};
  }
    
  return {
    ...stationData,
    geometry: stationData?.geometry,
  };
};
