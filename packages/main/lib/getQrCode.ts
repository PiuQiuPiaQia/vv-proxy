const QRCode = require("qrcode");
const base64 = require("base-64");
import getIpAddress from "./getIpAddress";

function getQrCode(payload: any) {
  const { port, app } = payload;
  return new Promise((resolve, reject) => {
    let protocol = app === "shadowrocket" ? "http://" : "socks5://";
    const ipAddress = getIpAddress();
    const configStr =
      app === "shadowrocket"
        ? base64.encode(`${ipAddress}:${port}`)
        : `${ipAddress}:${port}`;

    const url = `${protocol}${configStr}#proxySS`;
    console.log(url);
    
    QRCode.toDataURL(
      url,
      { type: "terminal" },
      function (err: any, url: string) {
        resolve(url);
      }
    );
  });
}

export default getQrCode;
