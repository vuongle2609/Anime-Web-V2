import { useState, useEffect, useRef } from "react";
import BoxAnimeDetail from "./animeBoxDetail";
import BoxAnimeList from "./animeBoxList";
import Fuckusers from "./fuckuser";

function AnimeBoxes({ display, apiFilter, firstSearch, setFirstSearch }) {
  const [dataA, setDataA] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const prevApi = useRef("");

  useEffect(() => {
    setDataA("");
    if (localStorage.searchdata) {
      animesHandle(JSON.parse(localStorage.searchdata));
    } else if (apiFilter === "") {
      setDataA("")
    } else if (!localStorage.searchdata || prevApi !== apiFilter) {
      setIsLoading(true);
      const fetchAnime = async (api) => {
        try {
          const response = await fetch(api);
          const data = await response.json();
          localStorage.setItem(
            "searchdata",
            JSON.stringify(data.data.documents)
          );
          animesHandle(data.data.documents);
          prevApi.current = api;
        } catch {
          setFirstSearch(false)
          setIsLoading(false)
        }
      };

      fetchAnime(apiFilter);
    } else if (prevApi === apiFilter) {
      animesHandle(localStorage.searchdata);
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
