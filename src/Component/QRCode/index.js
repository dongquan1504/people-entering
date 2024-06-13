import QRCode from 'qrcode.react';
import React from 'react';

function MyQRCode() {
  const link = 'https://www.facebook.com/dgquanduong';

  return (
    <div>
      <QRCode value={link} />
    </div>
  );
}

export default MyQRCode;