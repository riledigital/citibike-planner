import { selectCurrentStationId } from "common/store/AppSlice";
import { useGetLiveDataQuery } from "common/store/CBServer";
import { useSelector } from "react-redux";

export const useLiveStatus = (stationId = null) => {
  const { data: allLiveStatus } = useGetLiveDataQuery();

  const station_id = useSelector(selectCurrentStationId);
  // uses the old station_id field
  const currentStationId = stationId ?? station_id;

  let statusData = {
    num_bikes_available: 0,
    num_docks_available: 0,
    num_ebikes_available: 0,
    last_reported: 0,
  };
  // console.log({ currentStation });

  try {
    if (!stationId && currentStationId) {
      statusData = allLiveStatus?.[currentStationId] ?? statusData;
    } else {
      statusData = allLiveStatus?.[stationId] ?? statusData;
    }
  } catch (e) {
    console.error(e);
  }

  return statusData;
};
