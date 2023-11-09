const QRCode = require("qrcode");
const base64 = require("base-64");
import getIpAddress from "./getIpAddress";

function getQrCode(payload: any) {
  const { port } = payload;
  return new Promise((resolve, reject) => {
    const protocol = "http://";
    const ipAddress = getIpAddress();    
    const configStr = base64.encode(`${ipAddress}:${port}`);
    QRCode.toDataURL(
      `${protocol}${configStr}`,
      { type: "terminal" },
      function (err: any, url: string) {
        resolve(url);
      }
    );
  });
}

export default getQrCode;
