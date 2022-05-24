import styled from "styled-components";

import {
  selectCurrentStation,
  selectStationFavorited,
  toggleStationFavorite,
} from "common/store/AppSlice";

import { Button } from "components";
import { useDispatch, useSelector } from "react-redux";

const ManageStation = () => {
  const dispatch = useDispatch();
  const isFavorited = useSelector(selectStationFavorited);
  const currentId = useSelector(selectCurrentStation);

  const handleClick = () => {
    dispatch(toggleStationFavorite(currentId));
  };

  return (
    <StyledButton onClick={handleClick}>
      {isFavorited ? "Remove" : "Add"}
    </StyledButton>
  );
};

export default ManageStation;

const StyledButton = styled(Button)``;
