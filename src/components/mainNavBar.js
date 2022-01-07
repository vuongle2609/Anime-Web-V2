import { Link, useLocation, useNavigate } from "react-router-dom";

function OldSchoolMenuLink({ children, to, id }) {
  const location = useLocation();
  const match = location.pathname === to;

  return (
    <div className={match ? "box-nav active" : "box-nav"} id={id}>
      <Link to={to}>{children}</Link>
    </div>
  );
}

function Navigation() {
  const navigate = useNavigate();

  return (
    <>
      <div className=" header grid wide">
        <div className="popular">
          <Link to="/Home" className="logo">
            <div className="back-btn" onClick={() => navigate(-1)}>
              <box-icon color="#fff" name="arrow-back"></box-icon>
            </div>
            <div
              className="logo-img"
              style={{
                backgroundImage: `url('https://media.discordapp.net/attachments/914572068123721788/924219001180127292/bot.png?width=676&height=676')`,
              }}
            ></div>
            <span>Paff Wandering</span>
          </Link>
          <div className="nav">
            <OldSchoolMenuLink to="/Home">
              <span
                onClick={() => {
                  localStorage.removeItem("searchdata");
                }}
                className="nav-items"
              >
                Home
              </span>
            </OldSchoolMenuLink>
            <OldSchoolMenuLink to="/Search" id="search">
              <span className=" nav-items">Search</span>
            </OldSchoolMenuLink>
            <OldSchoolMenuLink to="/More?typeload=collection" id="collection">
              <span className=" nav-items">Favorite</span>
            </OldSchoolMenuLink>
            <OldSchoolMenuLink to="/More?typeload=history" id="history">
              <span className=" nav-items">history</span>
            </OldSchoolMenuLink>
            <OldSchoolMenuLink to="/AnimeDetail?random=true" id="random">
              <span className=" nav-items">Random</span>
            </OldSchoolMenuLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
