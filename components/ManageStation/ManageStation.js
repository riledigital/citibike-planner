import styled from "styled-components";

import {
  selectCurrentStation,
  selectStationFavorited,
  toggleStationFavorite,
} from "common/store/AppSlice";

import styles from "./ManageStation.module.css";

import { Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

const ManageStation = () => {
  const dispatch = useDispatch();
  const isFavorited = useSelector(selectStationFavorited);
  const currentId = useSelector(selectCurrentStation);

  const handleClick = () => {
    dispatch(toggleStationFavorite(currentId));
  };

  return (
    <StyledButton onClick={handleClick}>
      {isFavorited ? (
        <FaHeartBroken className={styles.icon} />
      ) : (
        <FaHeart className={styles.icon} />
      )}
    </StyledButton>
  );
};

export default ManageStation;

const StyledButton = styled(Button)``;
