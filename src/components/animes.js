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
    setDataA("");
    if (localStorage.searchdata){
      animesHandle(JSON.parse(localStorage.searchdata))
    } else if (apiFilter === "") {
      setDataA("");
    } else if (!animeData.current || prevApi !== apiFilter) {
      setIsLoading(true);
      fetch(apiFilter)
        .then((res) => res.json())
        .then((data) => {
          animeData.current = data.data.documents;
          localStorage.setItem('searchdata', JSON.stringify(data.data.documents));
          animesHandle(data.data.documents);
        })
        .then((prevApi.current = apiFilter));
    } else if (prevApi === apiFilter) {
      animesHandle(animeData.current);
    }
  }, [display, apiFilter]);

  const animesHandle = (data) => {
    setIsLoading(false);
    const animesObj = data;

    const htmls = animesObj.map((anime, index) => {
      let status = anime.status;
      let season = anime.season_period;
      let genres = anime.genres;
      let description = anime.descriptions;
      let year = anime.season_year

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
          width={"c-6"}
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
          width="c-2-4"
        />
      );
    });
    setDataA(htmls);
    setTimeout(() => {
      setFirstSearch(false);
    }, 1000);
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
