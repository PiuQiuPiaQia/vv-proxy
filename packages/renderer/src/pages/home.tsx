import { createSignal, onMount } from "solid-js";

export default function Home() {
  const [port, setPort] = createSignal(8888);
  const [ipAddress, setIpAddress] = createSignal("127.0.0.1");
  const [qrCodeUrl, setQrCodeUrl] = createSignal("");
  const [isSuccess, setIsSuccess] = createSignal(false);
  const [app, setApp] = createSignal("sagernet");

  onMount(() => {
    // 为什么更新port后，再获取还是旧的？？？
    setTimeout(() => {
      handleGenerAnd();
    }, 0);
  });

  const initIpAddress = () => {
    window.ipcRenderer.on("send-ip-address", (_, payload) => {
      console.log(payload.ipAddress);

      setIpAddress(payload.ipAddress);
    });
    window.ipcRenderer.send("get-ip-address");
  };
  const handleGenerIOS = () => {
    setPort(8888);
    handleGener("shadowrocket");
  };
  const handleGenerAnd = () => {
    setPort(8889);
    handleGener("sagernet");
  };
  const handleGener = (app: string) => {
    setApp(app);
    window.ipcRenderer.send("get-qr-code-url", {
      port: port(),
      app,
    });
    window.ipcRenderer.on("send-qr-code-url", (_event, payload) => {
      setQrCodeUrl(payload.url);
      setIsSuccess(true);
    });
  };

  initIpAddress();

  return (
    <section>
      <section>
        自动获取局域网地址，预制两个端口，默认生成的Sagernet(Android常用)二维码！
      </section>
      <section class="bg-gray-100 text-gray-700 p-8">
        <div class="flex items-center space-x-2">
          <output>{ipAddress()}:</output>
          <output>{port()}</output>
          <button
            class="border rounded-lg px-2 border-gray-900"
            onClick={handleGenerIOS}
          >
            shadowrocket
          </button>
          <button
            class="border rounded-lg px-2 border-gray-900"
            onClick={handleGenerAnd}
          >
            sagernet
          </button>
        </div>
        <div class="flex items-center space-x-2">
          {isSuccess() ? (
            <label>
              {app()}端口{port()}生成成功
            </label>
          ) : null}
        </div>
      </section>
      <section>
        <img src={qrCodeUrl()} />
      </section>
    </section>
  );
}
