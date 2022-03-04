import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";
import styles from "styles/favorites.module.css";

import {
  selectStationFavorites,
  setSelectedStationId,
  toggleStationFavorite,
} from "common/store/AppSlice";
import LayoutContent from "components/LayoutContent";

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
  const router = useRouter();
  return (
    <tr
      className={styles.tr}
      onClick={() => {
        dispatch(setSelectedStationId(station_id));
        router.push("/");
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
      <StyledTable>
        <tr className={styles.tr}>
          <th className={styles.stationId}>Station ID</th>
          <th className={styles.stationName}>Name</th>
          <th className={styles.stationBorough}>Borough</th>
        </tr>
        {Object.values(favorites).map((d) => (
          <StationItem key={d.station_id} {...d} />
        ))}
      </StyledTable>
    </LayoutContent>
  );
};

export default Favorites;

const StyledTable = styled.table`
  width: 100%;
`;
