import { get, push, ref, set } from "firebase/database";
import React, { useEffect, useRef } from "react";

import { QrReader } from "react-qr-reader";
import db from "../../firebase";

function Scaner({ isScanner, savedAccount, setIsScanner }) {
  const qrReaderRef = useRef(null);
  const dataRef = ref(db, "data");

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
