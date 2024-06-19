import React, { useEffect, useState } from "react";

import { get, ref } from "firebase/database";
import db from "../../firebase";

import ChartTab from "../../Component/ChartTab";
import Header from "../../Component/Header";

function Home() {
  const [data, setData] = useState([]);
  const savedAccount = JSON.parse(localStorage.getItem("account"));

  useEffect(() => {
    get(ref(db, "data"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(
            Object.values(
              Object.values(snapshot.val()).reduce((acc, obj) => {
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
  }, []);

  return (
    <Header>
      {data.map((item) => 
        <ChartTab item={item} savedAccount={savedAccount} />
      )}

      {/* {isBarMode && <Bar data={config} options={options} />} */}
    </Header>
  );
}

export default Home;
