import {
  selectStationFavorites,
  setSelectedStationId,
  toggleStationFavorite,
} from "common/store/AppSlice";
import LayoutContent from "components/LayoutContent";
import Title from "components/Title";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import styles from "styles/favorites.module.css";
import FavoriteStation from "../components/FavoriteStation";

const Favorites = () => {
  // const dispatch = useDispatch();
  const favorites = useSelector(selectStationFavorites);

  return (
    <LayoutContent>
      <Title>Favorites</Title>
      <h1>Favorites</h1>
      <p>Add stations to your favorites on the map!</p>
      <div className={styles.favoriteGrid}>
        {Object.values(favorites).map((d) => (
          <FavoriteStation key={d.station_id} {...d} />
        ))}
      </div>
      {/* <StyledTable>
        <tbody>
          <tr className={styles.tr}>
            <th className={styles.stationId}>Station ID</th>
            <th className={styles.stationName}>Name</th>
            <th className={styles.stationBorough}>Borough</th>
          </tr>
          {Object.values(favorites).map((d) => (
            <StationItem key={d.station_id} {...d} />
          ))}
        </tbody>
      </StyledTable> */}
    </LayoutContent>
  );
};

export default Favorites;

const StyledTable = styled.table`
  width: 100%;
`;
