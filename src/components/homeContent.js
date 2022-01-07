import { useState, useEffect } from "react";
import NavCategory from "./listAnimesNav";
import BoxAnimeList from "./animeBoxList";
import Fuckusers from "./fuckuser";

export default function HomeContent(props) {
  const [animeData, setAnimeData] = useState();
  const date = new Date();
  const year = date.getFullYear();
  let season;
  switch (date.getMonth()) {
    case 0:
    case 1:
    case 2:
      season = props.type === '0' ? 0 : 1 ;
      break;
    case 3:
    case 4:
    case 5:
      season = props.type === '0' ? 1 : 2;
      break;
    case 6:
    case 7:
    case 8:
      season = props.type === '0' ? 2 : 3;
      break;
    case 9:
    case 10:
    case 11:
      season = props.type === '0' ? 3 : 0;
      break;
    default:
  }

  useEffect(() => {
    let abortController = new AbortController();
    let api = `https://api.aniapi.com/v1/anime?year=${year}&season=${season}&nsfw=true`;

    const fetchAnime = async (api) => {
      try {
        let res = await fetch(api, {
          signal: abortController.signal,
        });
        let data = await res.json();
        setAnimeData(data);
      } catch {
        return 0
      }
    };

    fetchAnime(api);

    return () => {
      abortController.abort();
    };
  }, [season, year]);

  return (
    <>
      <NavCategory title={props.text} isD={true} year={year} season={season} type={props.type}/>
    <div className="row home-content">
      {animeData ? (
        animeData.data.documents.map((anime, index) => {
         
            let status = anime.status;
            let season = anime.season_period;
            let genres = anime.genres;
            let description = anime.descriptions;
            let year = anime.season_year;

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
                width={"c-2 l-2-4 m-4 s-6"}
                id={anime.id}
              />
            );
          
        })
      ) : (
        <Fuckusers firstSearch={false} isLoading={true} />
      )}
    </div></>
  );
}