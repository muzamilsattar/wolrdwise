import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([31.560047458720362, 74.33555841026865]); // Default fallback position

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition
  } = useGeolocation();

  // Parse lat/lng from search params
  const [mapLat, mapLng] = useUrlPosition();

  // Update position from search params
  useEffect(() => {
    if (!isNaN(mapLat) && !isNaN(mapLng)) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  // Update position from geolocation
  useEffect(() => {
    if (geolocationPosition && geolocationPosition.lat && geolocationPosition.lng) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      console.log("Geolocation updated:", geolocationPosition.lat, geolocationPosition.lng);
    }
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      <Button type='position' onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use your position"}
      </Button>
      <MapContainer center={mapPosition} zoom={9} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city) =>
          city.position?.lat && city.position?.lng ? (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
              // Other marker props
            />
          ) : null
        )}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();

  useEffect(() => {
    if (
      Array.isArray(position) &&
      position.length === 2 &&
      !isNaN(position[0]) &&
      !isNaN(position[1])
    ) {
      map.setView(position);
    } else {
      console.error("Invalid position for map center:", position);
    }
  }, [position, map]);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    }
  });
}

export default Map;
