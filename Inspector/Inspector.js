import { useState, useEffect } from "react";

import { StyledInspector, StyledDecorative } from "./styles";

import {
  LiveStatus,
  StationHeader,
  StationActivity,
  StationPopularity,
} from "./components";

import { useDispatch, useSelector } from "react-redux";

import {
  selectShowInspector,
  setSelectedStationId,
} from "@/common/store/AppSlice";
import { useSpring, useTrail } from "@react-spring/web";
import ManageStation from "@components/ManageStation";

import {
  selectStationFavorites,
  selectStationFavorited,
  toggleStationFavorite,
} from "@/common/Store/AppSlice";
import { dispatch } from "d3-dispatch";
// import { useSelector } from "react-redux";

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
    <div>
      Favorites
      <table>
        {Object.values(favorites).map((d) => (
          <StationItem key={d.station_id} {...d} />
        ))}
      </table>
    </div>
  );
};

const Inspector = () => {
  // const [stationActivityData, setStationActivityData] = useState(new Map());
  const visible = useSelector(selectShowInspector);
  const spring = useSpring({
    transform: `translateX(${visible ? "0" : "-100"}%)`,
  });

  const springs = useTrail(5, {
    trail: 1000,
    opacity: visible ? 1 : 0,
  });

  return (
    <StyledInspector {...{ style: spring }}>
      <StyledDecorative style={springs[0]}>Station Info</StyledDecorative>
      <StationHeader style={springs[1]} />
      <ManageStation />
      {/* <StationPopularity
        nta_name={currentRank.get("nta_name")}
        rank={currentRank.get("rank")}
        stations_in_nta={currentRank.get("stations_in_nta")}
      /> */}
      <StationActivity height={150} fill="white" />
      <LiveStatus />
      <Favorites />
    </StyledInspector>
  );
};

export default Inspector;
