import {
  selectCurrentStation,
  selectStationFavorited,
  setSelectedStationId,
  toggleStationFavorite,
} from "@/common/Store/AppSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ManageStation = () => {
  const dispatch = useDispatch();
  const isFavorited = useSelector(selectStationFavorited);
  const currentId = useSelector(selectCurrentStation);

  const handleClick = (e) => {
    dispatch(toggleStationFavorite(currentId));
  };
  return <button onClick={handleClick}>{isFavorited ? "-" : "+"}</button>;
};

export default ManageStation;
