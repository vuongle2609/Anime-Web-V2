import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BoxAnimeDetail from "./animeBoxDetail";
import BoxAnimeList from "./animeBoxList";
import NavSort from "./sortBar";
import Fuckusers from "./fuckuser";

function MoreAnimes() {
  const location = useLocation();
  let query = new URLSearchParams(location.search);
  const season = query.get("season")
  const year = query.get("year")
  const type = query.get("type")
  const api = `https://api.aniapi.com/v1/anime?year=${year}&season=${season}&nsfw=true`
  const [animeData, setAnimeData] = useState();
  const [display, setDisplay] = useState(false);

  const handleDL = () => {
    setDisplay(false);
  };

  const handleDD = () => {
    setDisplay(true);
  };

  useEffect(() => {
    document.querySelector(".back-btn").classList.add("active");

    const fetchAnime = async (apiAnime) => {
      try {
        const res = await fetch(apiAnime)
        const data = await res.json()
        setAnimeData(data)
        localStorage.setItem(`data${type}`, JSON.stringify(data))
      } catch {
        throw new Error("Fetch failed")
      }
    }

    if (!localStorage.getItem(`data${type}`)) {
      fetchAnime(api)
    } else {
      setAnimeData(JSON.parse(localStorage.getItem(`data${type}`)))
    }

    return () => document.querySelector(".back-btn").classList.remove("active");
  }, [type, api]);

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