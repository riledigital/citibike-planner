import { useDispatch, useSelector } from "react-redux";

import {
  selectStationFavorites,
  selectStationFavorited,
  toggleStationFavorite,
} from "@/common/Store/AppSlice";
import LayoutContent from "@components/LayoutContent";

const ToggleButton = ({ station_id }) => {
  const dispatch = useDispatch();
  const isFavorited = useSelector((state) => {
    return state?.AppSlice?.stationFavorites?.findIndex(
      (d) => d === station_id
    ) >= 0
      ? true
      : false;
  });

  const handleClick = (e) => {
    dispatch(toggleStationFavorite(station_id));
  };
  return (
    <div>
      <button onClick={handleClick}>{isFavorited ? "-" : "+"}</button>
    </div>
  );
};
const StationItem = ({ station_id, name, boroname }) => {
  const dispatch = useDispatch();
  return (
    <tr
      onClick={() => {
        dispatch(setSelectedStationId(station_id));
      }}
    >
      <td>{station_id}</td>
      <td>{name}</td>
      <td>{boroname}</td>
      <td>
        <ToggleButton station_id={station_id} />
      </td>
    </tr>
  );
};

const Favorites = () => {
  // const dispatch = useDispatch();
  const favorites = useSelector(selectStationFavorites);

  return (
    <LayoutContent>
      <h1>Favorites</h1>
      <p>Add stations to your favorites on the map!</p>
      <table>
        {Object.values(favorites).map((d) => (
          <StationItem key={d.station_id} {...d} />
        ))}
      </table>
    </LayoutContent>
  );
};

export default Favorites;
