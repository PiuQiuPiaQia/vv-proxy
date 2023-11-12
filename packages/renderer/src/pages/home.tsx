import { createSignal } from "solid-js";

export default function Home() {
  const [list, setList] = createSignal<any[]>([]);
  window.ipcRenderer.on("proxy-item-add", (_, { data }) => {
    console.log(data);
    setList(list().concat(data));
  });
  return (
    <section>
      这是vv-proxy
      <section class="proxy-list">
        {list().map((item) => (
          <div>
            {/* <div>{JSON.stringify(item)}</div> */}
            <output>Url: {item.url}</output>
            <output>Host: {item.host}</output>
            <output>Method: {item.method}</output>
          </div>
        ))}
      </section>
    </section>
  );
}
