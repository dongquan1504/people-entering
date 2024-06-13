import React, { useState, useRef, useEffect } from "react";

import { QrReader } from "react-qr-reader";

function Scaner({ isScanning }) {
  const [scanResult, setScanResult] = useState("");
  const qrReaderRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      console.log(data);
      setScanResult(data?.text || "");
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    if (!isScanning && qrReaderRef.current) {
      qrReaderRef.current.stopStream();
    }
  }, [isScanning]);

  return (
    <div>
      <QrReader
        ref={qrReaderRef}
        delay={500}
        onError={handleError}
        style={{ width: "100%" }}
        onResult={handleScan}
      />
      <p>{scanResult}</p>
    </div>
  );
}

export default Scaner;
