import Navigation from "./components/toppopular";
import BodyContainer from "./components/bodycontainer"
import "./responsive.css";
import "./style.scss";
import "boxicons";

function App() {
  return (
    <>
      <div className=" header grid wide">
        <div className="popular">
          <Navigation />
        </div>
      </div>

      <div className="body grid wide">
        <div className="body-container row">
          <BodyContainer />
        </div>
      </div>
    </>
  );
}

export default App;
