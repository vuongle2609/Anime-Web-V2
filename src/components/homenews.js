import { useState, useEffect } from "react";
import BoxAnimeDetail from "./boxdetail";

function HomeNews() {
  const [animeData, setAnimeData] = useState();

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

    fetch(api)
      .then((response) => response.json())
      .then((data) => setAnimeData(data));
  }, []);

  return (
    <div className="row home-news">
        <div className="nav-category">
          <h2>Newest</h2>
          <span>
            <span>Show more</span>
            <box-icon color="#9e9eb9" name="chevron-right"></box-icon>
          </span>
        </div>
      {animeData
        ? animeData.data.documents.map((anime, index) => {
            if (index < 3) {
              let status;
              let season;
              let genres;
              let description;
              switch (anime.status) {
                case 0:
                  status = "Finished";
                  break;
                case 1:
                  status = "Releasing";
                  break;
                case 2:
                  status = "Not yet released";
                  break;
                case 3:
                  status = "Cancelled";
              }

              if (
                anime.descriptions.en === "" ||
                anime.descriptions.en === null
              ) {
                description =
                  "This anime doesn't have an English description yet";
              } else {
                description = anime.descriptions.en;
              }

              switch (anime.season_period) {
                case 0:
                  season = "Winter";
                  break;
                case 1:
                  season = "Spring";
                  break;
                case 2:
                  season = "Summer";
                  break;
                case 3:
                  season = "Fall";
                  break;
                case 4:
                  season = "";
              }

              genres = anime.genres[0] + " ," + anime.genres[1];
              return (
                <BoxAnimeDetail
                  key={index}
                  cover={anime.cover_image}
                  title={anime.titles.en}
                  status={status}
                  genres={genres}
                  season={season ? season + " " + anime.season_year : "Unknown"}
                  description={description}
                  width={'c-4'}
                />
              );
            }
          })
        : "loadding"}
    </div>
  );
}

export default HomeNews;
