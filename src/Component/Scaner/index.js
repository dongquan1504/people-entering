import { get, push, ref, set } from "firebase/database";
import React, { useEffect, useRef } from "react";

import { QrReader } from "react-qr-reader";
import db from "../../firebase";

function truncateFloat(num) {
  const numStr = num.toString();
  const dotIndex = numStr.indexOf(".");
  if (dotIndex === -1) return num; // No decimal point, return the original number
  return numStr.slice(0, dotIndex + 4); // Keep three digits after the dot
}

function Scaner({ isScanner, savedAccount, setIsScanner }) {
  const qrReaderRef = useRef(null);
  const dataRef = ref(db, "data");
  const teacherRef = ref(db, "users");

  const checkLocation = (email) => {
    get(teacherRef).then((snapshot) => {
      if (snapshot.exists()) {
        const array = Object.values(snapshot.val());
        const index = array.findIndex((item) => item?.email === email);
        if (index !== -1) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const isLocationMatch =
                truncateFloat(position.coords.latitude) ===
                truncateFloat(array[index].latitude);
              const isLongitudeMatch =
                truncateFloat(position.coords.longitude) ===
                truncateFloat(array[index].longitude);
              if (!(isLongitudeMatch && isLocationMatch))
                console.log("Do not cheating!");
              return isLongitudeMatch && isLocationMatch;
            },
            (error) => {
              console.log(error.message);
            }
          );
        }
      }
    });
  };

  const handleScan = (data) => {
    if (data) {
      console.log(data);
      const emailAndId = data?.text.split(",");
      const email = emailAndId[0]; // "email@gmail.com"
      const id = emailAndId[1];

      get(dataRef).then((snapshot) => {
        if (snapshot.exists()) {
          const array = Object.values(snapshot.val());

          // Find the index of the object where name, role, and teacher_email match
          const index = array.findIndex(
            (item) =>
              item?.name === savedAccount?.name &&
              item?.role === savedAccount?.role &&
              item?.teacher_email === email &&
              id === item?.class_id
          );

          if (!checkLocation(email)) return;

          // If such an object is found, add exit_time and exit_day to it
          if (index !== -1) {
            array[index].exit_day = new Date().toLocaleDateString();
            array[index].exit_time = new Date().toLocaleTimeString("en-US", {
              hour12: false,
            });

            // Write the updated array back to Firebase
            set(dataRef, array);
          } else {
            const newData = {
              entry_day: new Date().toLocaleDateString(),
              entry_time: new Date().toLocaleTimeString("en-US", {
                hour12: false,
              }),
              exit_day: "",
              class_id: id,
              exit_time: "",
              name: savedAccount?.name,
              role: savedAccount?.role,
            };
            console.log(newData);
            const newDataRef = push(dataRef);
            set(newDataRef, { teacher_email: email, ...newData });
          }
        }
      });
      setIsScanner(!isScanner);
      qrReaderRef.current.stopStream();
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    if (!isScanner && qrReaderRef.current) {
      qrReaderRef.current.stopStream();
    }
  }, [isScanner]);

  return (
    <div>
      <QrReader
        ref={qrReaderRef}
        delay={500}
        onError={handleError}
        style={{ width: "100%" }}
        onResult={handleScan}
      />
    </div>
  );
}

export default Scaner;
