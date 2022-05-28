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
import { useStationData } from "../../hooks/useStationData";

const ToggleButton = ({ shortName }) => {
  const dispatch = useDispatch();

  const isFavorited = useSelector((state: any) => {
    return state?.AppSlice?.stationFavorites?.findIndex(
      (d) => d === shortName
    ) >= 0
      ? true
      : false;
  });

  const handleClick = (e) => {
    dispatch(toggleStationFavorite(shortName));
  };
  return (
    <div>
      <Button onClick={handleClick}>
        {isFavorited ? "Remove" : "Favorite"}
      </Button>
    </div>
  );
};

const FavoriteStation = ({ shortName }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { name, station_id, boroname } = useStationData(shortName);

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
            {name} <div className={styles.station}>{shortName}</div>
          </h3>
          <div className={styles.borough}>{boroname}</div>
        </div>
        <div className={styles.toggle}>
          <Button
            onClick={() => {
              dispatch(setSelectedShortName(shortName));
              router.push("/");
            }}
          >
            View in map
          </Button>
          <ToggleButton shortName={shortName} />
        </div>
      </div>
      <div>
        <RadialVis stationId={shortName} />
      </div>
      <div>
        <BarPlot stationId={shortName} />
      </div>
      <div>
        <LiveStatus stationId={station_id} />
      </div>
    </animated.div>
  );
};

export default FavoriteStation;
