import Navigation from "./components/mainNavBar";
import Search from "./components/searchContainer";
import Home from "./components/homeContainer";
import AnimeWatch from "./components/animeWatch"
import MoreAnimes from "./components/listAnimes";
import AnimeDetail from "./components/animeDetail";
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
          <Route index path="/" element={<Home />} />
          <Route index path="/Home" element={<Home />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/AnimeDetail" element={<AnimeDetail />} />
          <Route path="/More" element={<MoreAnimes />} />
          <Route path="/Watch" element={<AnimeWatch />} />
        </Routes>
    </>
  );
}

export default App;
