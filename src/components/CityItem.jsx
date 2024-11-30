import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long"
  }).format(new Date(date));
function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, date, emoji, id, position = {} } = city; // Fallback for `position`
  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`}
        to={position.lat && position.lng ? `${id}?lat=${position.lat}&lng=${position.lng}` : id}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.time}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
