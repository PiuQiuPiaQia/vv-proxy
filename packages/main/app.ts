var AnyProxy = require("anyproxy");

const startApp = () => {
  const options = {
    port: 8001,
    // rule: require('/Users/luoyang/Library/Application Support/Electron/rule_custom/custom_1c9ec7bc-f809-438c-a045-11dd87f95cee.js'),
    webInterface: {
      enable: true,
      webPort: 8002,
    },
    // throttle: 10000,
    forceProxyHttps: false,
    wsIntercept: false, // 不开启websocket代理
    silent: true,
  };
  const proxyServer = new AnyProxy.ProxyServer(options);
  proxyServer.on("ready", () => {
    console.log('proxyServer启动');
  });
  proxyServer.recorder.on("update", (data) => {
    // 发送广播
    console.log(data);
  });

  // 启动
  proxyServer.start();
};

export default startApp;
