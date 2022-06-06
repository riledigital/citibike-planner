import { selectStationFavorites } from "common/store/AppSlice";
import Title from "components/Title";
import { useSelector } from "react-redux";
import styles from "styles/favorites.module.css";
import FavoriteStation from "../components/FavoriteStation";

const Favorites = () => {
  // const dispatch = useDispatch();
  const favorites = useSelector(selectStationFavorites);

  return (
    <div className={styles.container}>
      <Title>Favorites</Title>
      <h1>Favorites</h1>
      <p>Add stations to your favorites on the map!</p>
      <div className={styles.favoriteGrid}>
        {Object.values(favorites).map(
          (short_name) =>
            short_name && (
              <FavoriteStation shortName={short_name} key={short_name} />
            )
        )}
      </div>
    </div>
  );
};

export default Favorites;
