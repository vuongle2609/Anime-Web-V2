import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom'

function OldSchoolMenuLink ({ children, to }) {
  const location = useLocation()
  const match = location.pathname === to

  return (
    <div className={match ? 'box-nav active' : 'box-nav '}>
      <Link to={to}>
        {children}
      </Link>
    </div>
  )
}

function Navigation() {
  const navigate = useNavigate()

  return (
    <>
      <div className=" header grid wide">
        <div className="popular">
          <div className="logo">
          <div className="back-btn" onClick={() => navigate(-1)}>
            <box-icon color="#fff" name='arrow-back'></box-icon>
          </div>
            <div
              className="logo-img"
              style={{
                backgroundImage: `url('https://media.discordapp.net/attachments/914572068123721788/924219001180127292/bot.png?width=676&height=676')`,
              }}
            ></div>
            <span>Paff Wandering</span>
          </div>
          <div className="nav">
            <OldSchoolMenuLink to="/Home"><span onClick={() => {
              localStorage.removeItem("searchdata")
            }} className="active nav-items">Home</span></OldSchoolMenuLink >
            <OldSchoolMenuLink to="/Search"><span className=" nav-items">Search</span></OldSchoolMenuLink >
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
