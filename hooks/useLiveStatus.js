import { selectCurrentStationData } from "common/store/AppSlice";

import { useGetLiveDataQuery } from "common/store/CBServer";
import { useSelector } from "react-redux";

export const useLiveStatus = (stationId = null) => {
  // const allLiveStatus = useSelector(selectAllLiveStatus);
  const { data: allLiveStatus } = useGetLiveDataQuery();
  let currentStation = useSelector(selectCurrentStationData);

  // uses the old station_id field
  const currentStationId = stationId ?? currentStation?.properties?.station_id;

  let statusData = {
    num_bikes_available: 0,
    num_docks_available: 0,
    num_ebikes_available: 0,
    last_reported: 0,
  };
  // console.log({ currentStation });

  try {
    if (!stationId && currentStationId) {
      statusData = allLiveStatus[currentStationId] ?? statusData;
    } else {
      statusData = allLiveStatus[stationId] ?? statusData;
    }
  } catch (e) {
    console.error(e);
  }

  return statusData;
};
