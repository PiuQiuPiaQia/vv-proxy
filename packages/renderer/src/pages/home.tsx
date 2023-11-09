import { createSignal } from "solid-js";

export default function Home() {
  const [port, setPort] = createSignal(9090);
  const [ipAddress, setIpAddress] = createSignal("127.0.0.1");
  const [qrCodeUrl, setQrCodeUrl] = createSignal("");
  const [isSuccess, setIsSuccess] = createSignal(false);

  const initIpAddress = () => {
    window.ipcRenderer.on("send-ip-address", (_, payload) => {
      console.log(payload.ipAddress);
      
      setIpAddress(payload.ipAddress);
    });
    window.ipcRenderer.send("get-ip-address");
  };
  const handleGener = () => {
    window.ipcRenderer.send("get-qr-code-url", {
      port: port()
    });
    window.ipcRenderer.on("send-qr-code-url", (_event, payload) => {
      setQrCodeUrl(payload.url);
      setIsSuccess(true);
    });
  };
  const handleInput = (e: any) => {
    setIsSuccess(false);
    setQrCodeUrl("");
    setPort(e.target.value);
  };

  initIpAddress();

  return (
    <section>
      <section class="bg-gray-100 text-gray-700 p-8">
        <div class="flex items-center space-x-2">
          <output>{ipAddress()}:</output>
          <input class="w-20" value={port()} onInput={handleInput} />
          <button
            class="border rounded-lg px-2 border-gray-900"
            onClick={handleGener}
          >
            生成
          </button>
          {isSuccess() ? <label>端口{port()}生成成功</label> : null}
        </div>
      </section>
      <div class="flex items-center w-200">
        <img src={qrCodeUrl()} alt="" />
      </div>
    </section>
  );
}
