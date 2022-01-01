import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BoxAnimeDetail from "./boxdetail";

function MoreAnimes() {
  const location = useLocation();
  const { api } = location.state;
  const [animeData, setAnimeData] = useState();

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => setAnimeData(data));
  }, []);

  return (
    <div className="body grid wide home">
      <div className="body-container row">
        {animeData
          ? animeData.data.documents.map((anime, index) => {
              let status = anime.status;
              let season = anime.season_period;
              let genres = anime.genres;
              let description = anime.descriptions;
              let year = anime.season_year;

              return (
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
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default MoreAnimes;
