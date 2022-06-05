import { selectShortName } from "common/store/AppSlice";
import { useGetHourlySummaryQuery } from "common/store/CBServer";
import { useSelector } from "react-redux";

export const useFrequency = (stationId = null) => {
  const short_name = useSelector(selectShortName);
  let { data } = useGetHourlySummaryQuery(stationId ?? short_name);
  return { data, lastUpdated: null };
};
