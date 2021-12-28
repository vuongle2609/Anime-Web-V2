import { useEffect } from "react";

function Navigation() {
  useEffect(() => {}, []);

  return (
    <>
      <div className="logo">
        <div
          className="logo-img"
          style={{
            backgroundImage: `url('https://media.discordapp.net/attachments/914572068123721788/924219001180127292/bot.png?width=676&height=676')`,
          }}
        ></div>
        <span>Paff Wandering</span>
      </div>
      <div className="nav">
        <span className="active">Home</span>
        <span className="">Search</span>
        <span>
          <div
            style={{
              backgroundImage: `url('https://media.discordapp.net/attachments/914572068123721788/924219001180127292/bot.png?width=676&height=676')`,
            }}
          ></div>
          Miku Anmigoi
          <box-icon name="chevron-down" type="solid" color="#ffffff"></box-icon>
        </span>
      </div>
    </>
  );
}

export default Navigation;
