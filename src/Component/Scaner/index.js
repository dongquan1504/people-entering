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

const checkLocation = (email, savedAccount) => {
  const teacherRef = ref(db, "users");
  let result = true;
  get(teacherRef).then((snapshot) => {
    if (snapshot.exists()) {
      const array = Object.values(snapshot.val());
      const index = array.findIndex((item) => item?.email === email);

      if (index !== -1) {
        const isLocationMatch =
          truncateFloat(savedAccount.latitude) ===
          truncateFloat(array[index].latitude);
        const isLongitudeMatch =
          truncateFloat(savedAccount.longitude) ===
          truncateFloat(array[index].longitude);

        if (!(isLongitudeMatch && isLocationMatch)) alert("Do not cheating!");
        result = (isLongitudeMatch && isLocationMatch);
      }
    }
  });
  return result;
};

function Scaner({ isScanner, savedAccount, setIsScanner }) {
  const qrReaderRef = useRef(null);
  const dataRef = ref(db, "data");

  const handleScan = (data) => {
    if (data) {
      console.log(data);
      const emailAndId = data?.text.split(",");
      const email = emailAndId[0]; // "email@gmail.com"
      const id = emailAndId[1];

      if (!checkLocation(email, savedAccount)) {
        setIsScanner(!isScanner);
        qrReaderRef.current.stopStream();
        return;
      }

      get(dataRef).then((snapshot) => {
        if (snapshot.exists()) {
          const array = Object.values(snapshot.val());

          // Find the index of the object where name, role, and teacher_email match
          const index = array.reduce(
            (acc, item, idx) =>
              item?.name === savedAccount?.name &&
              item?.role === savedAccount?.role &&
              item?.teacher_email === email &&
              id === item?.class_id
                ? idx
                : acc,
            -1
          );

          // If such an object is found, add exit_time and exit_day to it
          if (
            index !== -1 &&
            array[index].entry_day === new Date().toLocaleDateString()
          ) {
            if (array[index].exit_day === new Date().toLocaleDateString()) {
              alert("Attendance already taken!");
              return;
            }
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
          alert("Attendance taken successfully!");
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
        constraints={{ facingMode: "environment" }}
      />
    </div>
  );
}

export default Scaner;
