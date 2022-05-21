import {
  setSelectedStationId,
  toggleStationFavorite,
} from "common/store/AppSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import BarPlot from "Inspector/components/StationActivity/BarPlot";
import LiveStatus from "Inspector/components/LiveStatus";
import Button from "components/Button";

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
      <Button onClick={handleClick}>
        {isFavorited ? "Remove" : "Favorite"}
      </Button>
    </div>
  );
};

const FavoriteStation = ({ station_id, name, boroname }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.stationHeader}>
        <div className={styles.info}>
          <div className={styles.name}>
            {name} <div className={styles.station}>{station_id}</div>
          </div>
          <div className={styles.borough}>{boroname}</div>
        </div>
        <div className={styles.toggle}>
          <Button
            onClick={() => {
              dispatch(setSelectedStationId(station_id));
              router.push("/");
            }}
          >
            View in map
          </Button>
          <ToggleButton station_id={station_id} />
        </div>
      </div>
      <div>
        <BarPlot stationId={station_id} />
      </div>
      <div>
        <LiveStatus stationId={station_id} />
      </div>
    </div>
  );
};

export default FavoriteStation;
