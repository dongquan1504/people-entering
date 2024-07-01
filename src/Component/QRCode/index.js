import { get, ref, set } from "firebase/database";
import QRCode from "qrcode.react";
import React from "react";
import { FormControl } from "@mui/material";

import db from "../../firebase";
import Button from "../Button";
import Input from "../Input";

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function MyQRCode({ value, qr, setQr }) {
  // const link = "https://www.facebook.com/dgquanduong";
  const [className, setClassName] = React.useState("");

  const userRef = ref(db, "users");

  const handleAddNewQr = () => {
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const array = Object.values(snapshot.val());

        // Find the index of the object where name, role, and teacher_email match
        const index = array.findIndex((item) => item?.email === value);

        // If such an object is found, add exit_time and exit_day to it
        if (index !== -1) {
          // Check if class_id is an array, if not initialize it as an array
          if (!Array.isArray(array[index].class_id)) {
            array[index].class_id = [];
          }

          // Generate a random string and push it to the class_id array
          const randomString = generateRandomString(20);
          array[index].class_id.push({ id: randomString, name: className });

          // Write the updated array back to Firebase
          setQr([...qr, { id: randomString, name: className }]);
          set(userRef, array);
          localStorage.setItem(
            "account",
            JSON.stringify({
              ...JSON.parse(localStorage.getItem("account")),
              class_id: [...qr, { id: randomString, name: className }],
            })
          );
          setClassName("");
        }
      }
    });
  };

  const handleDeleteQr = (id) => {
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const array = Object.values(snapshot.val());

        // Find the index of the object where name, role, and teacher_email match
        const index = array.findIndex((item) => item?.email === value);

        // If such an object is found, add exit_time and exit_day to it
        if (index !== -1 && Array.isArray(array[index].class_id)) {
          // Find the index of the string in the class_id array
          const stringIndex = array[index].class_id.findIndex(
            (e) => e.id === id
          );

          // If the string is found, remove it from the array
          if (stringIndex !== -1) {
            array[index].class_id.splice(stringIndex, 1);

            // Write the updated array back to Firebase
            set(userRef, array);
            setQr(array[index].class_id);
            localStorage.setItem(
              "account",
              JSON.stringify({
                ...JSON.parse(localStorage.getItem("account")),
                class_id: array[index].class_id,
              })
            );
          }
        }
      }
    });
  };

  return (
    <>
      <Button onClick={handleAddNewQr}>Add Class</Button>
      <FormControl sx={{ padding: "10px" }}>
        <Input
          type="text"
          label="Class Name"
          placeholder="enter your name"
          style={{ marginBottom: "30px" }}
          onChange={(e) => setClassName(e.target.value)}
        />
      </FormControl>
      {qr.map((ids) => (
        <div
          style={{
            margin: "10px",
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
          }}
        >
          Class Name: {ids?.name}
          <div style={{ margin: "auto" }}>
            <QRCode value={value + "," + (ids.id || ids)} />
          </div>
          <Button onClick={() => handleDeleteQr(ids.id || ids)}>
            End Class
          </Button>
        </div>
      ))}
    </>
  );
}

export default MyQRCode;
