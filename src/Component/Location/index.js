import React, { useState, useEffect } from "react";
import { get, ref, set } from "firebase/database";

import db from "../../firebase";

function LocationComponent({ savedAccount }) {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState("");

  const userRef = ref(db, "users");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const array = Object.values(snapshot.val());

        const index = array.findIndex(
          (item) => item?.email === savedAccount?.email
        );

        if (index !== -1) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              array[index].latitude = position.coords.latitude;
              array[index].longitude = position.coords.longitude;
              set(userRef, array);
            },
            (error) => {
              setError(error.message);
            }
          );
        }
      }
    });
  }, []);

  return (
    <div>
      {error ? (
        <p>Error fetching location: {error}</p>
      ) : (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}
    </div>
  );
}

export default LocationComponent;
