import {
  selectCurrentStationData,
  selectStationFavorited,
  toggleStationFavorite,
} from "common/store";
import { useStationData } from "hooks/useStationData";
import { Button } from "components";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ManageStation.module.css";

const ManageStation = () => {
  const dispatch = useDispatch();
  const isFavorited = useSelector(selectStationFavorited);
  const { short_name } = useStationData();

  const handleClick = () => {
    dispatch(toggleStationFavorite(short_name));
  };

  return (
    <Button className={styles.button} onClick={handleClick}>
      {isFavorited ? (
        <FaHeartBroken className={styles.icon} />
      ) : (
        <FaHeart className={styles.icon} />
      )}
    </Button>
  );
};

export default ManageStation;
