import { useEffect } from "react";
import { Link } from "react-router-dom";

function Navigation() {
  useEffect(() => {
    const navItem = document.querySelectorAll('.nav-items')
    for (let i = 0; i < 2; i++) {
      navItem[i].onclick = (e) => {
        i == 0 ? 
        navItem[1].classList.remove('active') : 
        navItem[0].classList.remove('active') 
        e.target.classList.add('active')
      }
    }
  }, []);

  return (
    <>
      <div className=" header grid wide">
        <div className="popular">
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
            <Link to="/Home"><span className=" nav-items">Home</span></Link>
            <Link to="/Search"><span className="active nav-items">Search</span></Link>
            <span>
              <div
                style={{
                  backgroundImage: `url('https://media.discordapp.net/attachments/914572068123721788/924219001180127292/bot.png?width=676&height=676')`,
                }}
              ></div>
              Miku Anmigoi
              <box-icon
                name="chevron-down"
                type="solid"
                color="#ffffff"
              ></box-icon>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
