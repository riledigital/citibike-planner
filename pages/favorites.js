import { selectStationFavorites } from "@/common/Store/AppSlice";
import React from "react";
import { useSelector } from "react-redux";

const Favorites = () => {
  // const dispatch = useDispatch();
  const favorites = useSelector(selectStationFavorites);

  return (
    <div>
      Favorites
      <ul>{JSON.stringify(favorites)}</ul>
    </div>
  );
};

export default Favorites;
