import { useHover } from "@react-aria/interactions";
import {
  setSelectedShortName,
  toggleStationFavorite,
} from "common/store/AppSlice";
import Button from "components/Button";
import LiveStatus from "Inspector/components/LiveStatus";
import BarPlot from "Inspector/components/StationActivity/BarPlot";
import RadialVis from "Inspector/components/StationActivity/RadialVis";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animated, useSpring } from "@react-spring/web";

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

const FavoriteStation = ({ short_name, station_id, name, boroname }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // let [events, setEvents] = useState([]);
  let { hoverProps, isHovered } = useHover({});

  const styleProps = useSpring({
    transform: isHovered ? `translateY(-10px)` : `translateY(0px)`,
    filter: isHovered
      ? `drop-shadow(0 12px 8px rgba(0, 0, 0, 0.15))`
      : `drop-shadow(0 3px 4px rgba(0, 0, 0, 0.5))`,
  });

  return (
    <animated.div
      {...hoverProps}
      style={styleProps}
      className={styles.container}
    >
      <div className={styles.stationHeader}>
        <div className={styles.info}>
          <h3 className={styles.name}>
            {name} <div className={styles.station}>{short_name}</div>
          </h3>
          <div className={styles.borough}>{boroname}</div>
        </div>
        <div className={styles.toggle}>
          <Button
            onClick={() => {
              dispatch(setSelectedShortName(short_name));
              router.push("/");
            }}
          >
            View in map
          </Button>
          <ToggleButton station_id={short_name} />
        </div>
      </div>
      <div>
        <RadialVis stationId={short_name} />
      </div>
      <div>
        <BarPlot stationId={short_name} />
      </div>
      <div>
        <LiveStatus stationId={station_id} />
      </div>
    </animated.div>
  );
};

export default FavoriteStation;
