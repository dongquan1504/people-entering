import { Button } from "@mui/material";
import React, { useState } from "react";
import QRCode from "qrcode.react";

export default function QRItem({ ids, handleDeleteQr, value }) {
  const [isShow, setIsShow] = useState(false);

  return (
    <div
      style={{
        margin: "10px",
        border: "1px solid black",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "8px" }}>Class Name: {ids?.name}</div>
      {isShow ? (
        <>
          <div style={{ margin: "auto" }}>
            <QRCode
              value={value + "," + (ids.id || ids)}
              style={{ height: "250px", width: "250px" }}
            />
          </div>
          <Button onClick={() => setIsShow(false)}>hidden QR</Button>
          <Button onClick={() => handleDeleteQr(ids.id || ids)}>
            End Class
          </Button>
        </>
      ) : (
        <Button onClick={() => setIsShow(true)}>More Detail</Button>
      )}
    </div>
  );
}
