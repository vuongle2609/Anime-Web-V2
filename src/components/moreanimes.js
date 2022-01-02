import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BoxAnimeDetail from "./boxdetail";
import BoxAnimeList from "./boxlist";
import NavSort from "./navsort";
import Fuckusers from "./fuckuser";

function MoreAnimes() {
  const location = useLocation();
  const { api } = location.state;
  const [animeData, setAnimeData] = useState();
  const [display, setDisplay] = useState(false);

  const handleDL = () => {
    setDisplay(false);
  };

  const handleDD = () => {
    setDisplay(true);
  };

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => setAnimeData(data));
  }, []);

  return (
    <div className="body grid wide home">
      <NavSort display={display} setL={handleDL} setD={handleDD} />
      <div className="body-container row">
        {animeData
          ? animeData.data.documents.map((anime, index) => {
              let status = anime.status;
              let season = anime.season_period;
              let genres = anime.genres;
              let description = anime.descriptions;
              let year = anime.season_year;

              return display ? (
                <BoxAnimeDetail
                  key={index}
                  cover={anime.cover_image}
                  title={anime.titles.en}
                  status={status}
                  genres={genres}
                  season={season}
                  year={year}
                  description={description}
                  width={"c-4"}
                  id={anime.id}
                />
              ) : (
                <BoxAnimeList
                  key={index}
                  cover={anime.cover_image}
                  title={anime.titles.en}
                  status={status}
                  season={season}
                  year={year}
                  id={anime.id}
                  width="c-2"
                />
              );
            })
          : <Fuckusers firstSearch={false} isLoading={true}/>}
      </div>
    </div>
  );
}

export default MoreAnimes;
