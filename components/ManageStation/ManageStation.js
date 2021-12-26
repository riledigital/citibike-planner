import styled from "styled-components";

import {
  selectCurrentStation,
  selectStationFavorited,
  toggleStationFavorite,
} from "@/common/Store/AppSlice";

import { Button } from "@/components";

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
    <StyledButton onClick={handleClick}>
      {isFavorited ? "Remove" : "Add"}
    </StyledButton>
  );
};

export default ManageStation;

const StyledButton = styled(Button)`
  float: right;
`;
