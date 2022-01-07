import { useEffect } from "react";
import { Link } from "react-router-dom"

function ButtonNav() {
  useEffect(() => {
    document.querySelector(".button-nav").onclick = () => {
      document.querySelector(".button-nav-menu").classList.toggle("active");
    };
  }, []);

  return (
    <>
      <div className="button-nav">
        <box-icon color="#fff" name="menu"></box-icon>
        <div className="button-nav-menu">
            <div className="button-nav-menu__item">
          <Link to="/Home" onClick={() => {
            localStorage.removeItem("searchdata")
          }}>
              <box-icon color="#fff" name="home"></box-icon>
              <p>Home</p>
          </Link>
            </div>
            <div className="button-nav-menu__item">
          <Link to="/More?typeload=collection">
              <box-icon color="#fff" name="heart"></box-icon>
              <p>Favorite</p>
          </Link>
            </div>
            <div className="button-nav-menu__item">
          <Link to="/Search">
              <box-icon color="#fff" name="search"></box-icon>
              <p>search</p>
          </Link>
            </div>
            <div className="button-nav-menu__item">
          <Link to="/More?typeload=history">
              <box-icon color="#fff" name="history"></box-icon>
              <p>History</p>
          </Link>
            </div>
            <div className="button-nav-menu__item">
          <Link to="/More?typeload=blacklist">
              <box-icon color="#fff" name="block"></box-icon>
              <p>Black list</p>
          </Link>
            </div>
            <div className="button-nav-menu__item">
          <Link to={`/AnimeDetail?random=true`} >
              <box-icon color="#fff" name="shuffle"></box-icon>
              <p>Random</p>
          </Link>
            </div>
            <div className="button-nav-menu__item">
          <a href="https://www.facebook.com/vuong.lethanh.315/" target="_blank" rel="noopener">
              <box-icon color="#fff" name="user"></box-icon>
              <p>Contact</p>
          </a>
            </div>
        </div>
      </div>
    </>
  );
}

export default ButtonNav;
