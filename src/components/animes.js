import { useState, useEffect, useRef } from "react";
import BoxAnimeDetail from "./boxdetail";
import BoxAnimeList from "./boxlist";
import Fuckusers from "./fuckuser";

function AnimeBoxes({ display, apiFilter, firstSearch, setFirstSearch }) {
  const [dataA, setDataA] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const animeData = useRef(false);
  const prevApi = useRef("");

  useEffect(() => {
    setDataA("")
    if (apiFilter === "") {
      setDataA("");
    } else if (!animeData.current || prevApi !== apiFilter) {
      setIsLoading(true);
      fetch(apiFilter)
        .then((res) => res.json())
        .then((data) => {
          animeData.current = data;
          animesHandle(data);
        })
        .then((prevApi.current = apiFilter));
    } else if (prevApi === apiFilter) {
      animesHandle(animeData.current);
    }
  }, [display, apiFilter]);

  const animesHandle = (data) => {
    setIsLoading(false)
    let status;
    let season;
    let genres;
    let description;
    const animesObj = data;

    const htmls = animesObj.data.documents.map((anime, index) => {
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

      if (anime.descriptions.en === "" || anime.descriptions.en === null) {
        description = "This anime doesn't have an English description yet";
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

      return display ? (
        <BoxAnimeDetail
          key={index}
          cover={anime.cover_image}
          title={anime.titles.en}
          status={status}
          genres={genres}
          season={season ? season + " " + anime.season_year : "Unknown"}
          description={description}
        />
      ) : (
        <BoxAnimeList
          key={index}
          cover={anime.cover_image}
          title={anime.titles.en}
          status={status}
          season={season ? season + " " + anime.season_year : "Unknown"}
        />
      );
    });
    setDataA(htmls);
    setTimeout(() => {
        setFirstSearch(false)
    },1000)
  };
  return (
    <div className="row animes-container">
      {dataA === "" ? (
        <Fuckusers firstSearch={firstSearch} isLoading={isLoading} />
      ) : (
        dataA
      )}
    </div>
  );
}

export default AnimeBoxes;
