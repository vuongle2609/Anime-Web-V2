import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BoxAnimeDetail from "./animeBoxDetail";
import BoxAnimeList from "./animeBoxList";
import NavSort from "./sortBar";
import Fuckusers from "./fuckuser";

function MoreAnimes() {
  const location = useLocation();
  let query = new URLSearchParams(location.search);
  const typeload = query.get("typeload");
  const season = query.get("season");
  const year = query.get("year");
  const type = query.get("type");
  const api = `https://api.aniapi.com/v1/anime?year=${year}&season=${season}&nsfw=true`;
  const [animeData, setAnimeData] = useState();
  const [display, setDisplay] = useState(false);
  const [nothing, setNothing] = useState(false);
  const [block, setblock] = useState(false);
  const [trigger, settrigger] = useState(false);

  const handleDL = () => {
    setDisplay(false);
  };

  const handleDD = () => {
    setDisplay(true);
  };

  useEffect(() => {
    document.querySelector(".back-btn").classList.add("active");

    if (typeload === "history") {
      document.querySelector("#history").classList.add("active");
      setNothing(
        <Fuckusers
          firstSearch={false}
          isLoading={false}
          text="Nothing here yet"
        />
      );
      setAnimeData(JSON.parse(localStorage.getItem(`history`)));
    } else if (typeload === "collection") {
      document.querySelector("#collection").classList.add("active");
      setNothing(
        <Fuckusers
          firstSearch={false}
          isLoading={false}
          text="Nothing here yet"
        />
      );
      setAnimeData(JSON.parse(localStorage.getItem(`collection`)));
    } else if (typeload === "blacklist") {
      setblock(true);
      setNothing(
        <Fuckusers
          firstSearch={false}
          isLoading={false}
          text="Nothing here yet"
        />
      );
      setAnimeData(JSON.parse(localStorage.getItem(`blacklist`)));
    } else {
      setNothing(<Fuckusers firstSearch={false} isLoading={true} />);
      const fetchAnime = async (apiAnime) => {
        try {
          const res = await fetch(apiAnime);
          const data = await res.json();
          setAnimeData(data.data.documents);
          localStorage.setItem(
            `data${type}`,
            JSON.stringify(data.data.documents)
          );
        } catch {
          throw new Error("Fetch failed");
        }
      };

      if (!localStorage.getItem(`data${type}`)) {
        fetchAnime(api);
      } else {
        setAnimeData(JSON.parse(localStorage.getItem(`data${type}`)));
      }
    }

    return () => {
      document.querySelector(".back-btn").classList.remove("active");
      document.querySelector("#history").classList.remove("active");
      document.querySelector("#collection").classList.remove("active");

      setDisplay(false)
    };
  }, [type, api, location]);

  return animeData ? (
    <div className="body grid wide home">
      <NavSort display={display} setL={handleDL} setD={handleDD} />
      <div className="body-container row">
        {animeData.map((anime, index) => {
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
              titles={anime.titles}
              status={status}
              genres={genres}
              season={season}
              year={year}
              description={description}
              width={"c-4 m-6 s-12"}
              id={anime.id}
              block={block}
              settrigger={settrigger}
              trigger={trigger}
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
              width="c-2 l-2-4 m-4 s-6"
              block={block}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <div className="body grid wide home">
      {nothing}
    </div>
  );
}

export default MoreAnimes;
