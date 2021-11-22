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
  return (
    <div>
      <button onClick={handleClick}>{isFavorited ? "Remove" : "Add"}</button>
    </div>
  );
};

export default ManageStation;
