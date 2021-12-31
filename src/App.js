import Navigation from "./components/navbar";
import Search from "./components/searchcontainer";
import Home from "./components/homecontainer";
import { Routes, Route } from "react-router-dom";
import "./responsive.css";
import "./style.scss";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "boxicons";

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route index path="/Home" element={<Home />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
