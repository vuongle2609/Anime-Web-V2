import Navigation from "./components/toppopular";
import FilterBar from "./components/filterbar";
import RightRender from "./components/rightrender";
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
          <div className="left-container col c-3">
            <FilterBar />
          </div>
          <div className="right-container col c-9">
            <RightRender />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
