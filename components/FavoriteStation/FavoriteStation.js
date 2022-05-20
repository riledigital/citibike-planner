import {
  setSelectedStationId,
  toggleStationFavorite,
} from "common/store/AppSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import LiveStatus from "Inspector/components/LiveStatus";

import styles from "./FavoriteStation.module.css";

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

const FavoriteStation = ({ station_id, name, boroname }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div
      className={styles.container}
      onClick={() => {
        dispatch(setSelectedStationId(station_id));
        router.push("/");
      }}
    >
      <div className={styles.info}>
        <div className={styles.name}>
          {name} <div className={styles.station}>{station_id}</div>
        </div>
        <div className={styles.borough}>{boroname}</div>
        <div className={styles.toggle}>
          <ToggleButton station_id={station_id} />
        </div>
      </div>
      <div>
        <LiveStatus stationId={station_id} />
      </div>
      <div>
        <LiveStatus stationId={station_id} />
      </div>
    </div>
  );
};

export default FavoriteStation;
