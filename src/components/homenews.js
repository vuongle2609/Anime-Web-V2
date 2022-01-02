import { useState, useEffect, useRef } from "react";
import NavCategory from "./navcategory";
import BoxAnimeList from "./boxlist";
import BoxAnimeDetail from "./boxdetail";

function HomeNews() {
  const [animeData, setAnimeData] = useState();
  const animeApi = useRef()
  let animeCount = 0

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    let season;
    switch (date.getMonth()) {
      case 0:
      case 1:
      case 2:
        season = 0;
        break;
      case 3:
      case 4:
      case 5:
        season = 1;
        break;
      case 6:
      case 7:
      case 8:
        season = 2;
        break;
      case 9:
      case 10:
      case 11:
        season = 3;
    }
    let api = `https://api.aniapi.com/v1/anime?year=${year}&season=${season}&nsfw=true`;
    animeApi.current = api

    fetch(api)
      .then((response) => response.json())
      .then((data) => setAnimeData(data));
  }, []);

  return (
    <div className="row home-news">
      <NavCategory title="What's New" isD={true} api={animeApi.current} />
      {animeData
        ? animeData.data.documents.map((anime, index) => {
            if (animeCount < 6) {
              let status = anime.status;
              let season = anime.season_period;
              let genres = anime.genres;
              let description = anime.descriptions;
              let year = anime.season_year;
              animeCount++

              return (
                <BoxAnimeList
                  key={index}
                  cover={anime.cover_image}
                  title={anime.titles.en}
                  status={status}
                  genres={genres}
                  season={season}
                  year={year}
                  description={description}
                  width={"c-2"}
                  id={anime.id}
                />
              );
            }
          })
        : ""}
    </div>
  );
}

export default HomeNews;
