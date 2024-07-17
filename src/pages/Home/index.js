import React, { useEffect, useState } from "react";

import { get, ref } from "firebase/database";
import db from "../../firebase";

import ChartTab from "../../Component/ChartTab";
import Header from "../../Component/Header";

function Home() {
  const [data, setData] = useState([]);
  const savedAccount = JSON.parse(localStorage.getItem("account"));

  const fetchData = (account) => {
    get(ref(db, "data"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (
            !Object.values(snapshot.val())
              .map((item) => item.teacher_email)
              .includes(account?.email)
          )
            return;

          const yourClass = Object.values(snapshot.val()).filter(
            (item) => item.teacher_email === account?.email
          );

          setData(
            Object.values(
              yourClass.reduce((acc, obj) => {
                const key = obj.entry_day;
                if (!acc[key]) {
                  acc[key] = [];
                }
                acc[key].push(obj);
                return acc;
              }, {})
            )
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(()=>fetchData(savedAccount), [savedAccount]);

  return (
    <Header fetchData={fetchData}>
      {!!data.length ? (
        data.map((item) => (
          <ChartTab key={item} item={item} savedAccount={savedAccount} />
        ))
      ) : (
        <span style={{ padding: "80px", display: "flex" }}>
          You dont manage any class
        </span>
      )}

      {/* {isBarMode && <Bar data={config} options={options} />} */}
    </Header>
  );
}

export default Home;
