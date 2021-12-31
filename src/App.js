import Navigation from "./components/navbar";
import Search from "./components/searchcontainer";
import Home from "./components/homecontainer";
import { Routes, Route } from "react-router-dom";
import "./responsive.css";
import "./style.scss";
import "boxicons";

function App() {
  return (
    <>
      <Navigation />

      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />}/>
          <Route path="/Search" element={<Search />} />          
        </Routes>
      </div>
    </>
  );
}

export default App;
