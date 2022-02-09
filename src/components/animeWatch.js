import { useState, useEffect } from "react";
import ReactHlsPlayer from "react-hls-player";
import "@vime/core/themes/default.css";
import corn from "../img/popcorn.gif";
import { useLocation } from "react-router-dom";

function AnimeWatch() {
  const location = useLocation();
  let query = new URLSearchParams(location.search);
  const id = query.get("id");
  const sub = query.get("sub") === "true";
  const dub = query.get("dub") === "true";
  const [subdata, setSubdata] = useState(false);
  const [dubdata, setDubdata] = useState(false);
  const [animedata, setAnimedata] = useState(false);
  const [videoSrc, setVideoSrc] = useState(false);
  const [currentEp, setCurrentEp] = useState(false);
  const [currentType, setCurrentType] = useState(false);
  const [choose, setChoose] = useState(false);

  useEffect(() => {
    document.querySelector(".back-btn").classList.add("active");

    const getSub = async (idAnime) => {
      try {
        const res = await fetch(
          `https://api.aniapi.com/v1/episode?anime_id=${idAnime}&is_dub=false&locale=en`
        );
        const data = await res.json();
        setSubdata(data.data.documents);
      } catch {
        throw new Error(`cant play`);
      }
    };

    const getDub = async (idAnime) => {
      try {
        const res = await fetch(
          `https://api.aniapi.com/v1/episode?anime_id=${idAnime}&is_dub=true&locale=en`
        );
        const data = await res.json();
        setDubdata(data.data.documents);
      } catch {
        throw new Error(`cant play`);
      }
    };

    const getAnime = async (idAnime) => {
      try {
        const res = await fetch(`https://api.aniapi.com/v1/anime/${idAnime}`);
        const data = await res.json();
        setAnimedata(data.data);
      } catch {
        throw new Error(`cant play`);
      }
    };

    getAnime(id);

    if (sub) {
      getSub(id);
    }

    if (dub) {
      getDub(id);
    }

    setTimeout(() => {
      if (sub) {
        document.querySelector(".ep-1-sub").click();
      } else {
        document.querySelector(".ep-1-dub").click();
      }
    }, 2000);

    return () => {
      document.querySelector(".back-btn").classList.remove("active");
    };
  }, []);

  return (
    <div className="wide grid body">
      <div className="row">
        <div className="col c-12 anime-watch">
          <h1>
            {animedata ? animedata.titles.en : false} -{" "}
            {!choose ? "Choose your episode" : "Episode " + currentEp}
          </h1>
          <div className="anime-video">
            <ReactHlsPlayer
              src={videoSrc}
              autoPlay={false}
              controls={true}
              width="100%"
              height="auto"
            />
          </div>
          {subdata ? (
            <div className="list-ep">
              <h3>English Sub</h3>
              <ul>
                {subdata.map((ep, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setVideoSrc(ep.video);
                        setCurrentEp(ep.number);
                        setCurrentType("sub");
                        setChoose(true);
                      }}
                      className={
                        ep.number === currentEp && currentType === "sub"
                          ? `ep-${ep.number}-sub active`
                          : `ep-${ep.number}-sub `
                      }
                    >
                      ep {ep.number}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            false
          )}
          {dubdata ? (
            <div className="list-ep">
              <h3>English Dub</h3>
              <ul>
                {dubdata.map((ep, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setVideoSrc(ep.video);
                      setCurrentEp(ep.number);
                      setCurrentType("dub");
                      setChoose(true);
                    }}
                    className={
                      ep.number === currentEp && currentType === "dub"
                        ? `ep-${ep.number}-dub active`
                        : `ep-${ep.number}-dub `
                    }
                  >
                    ep {ep.number}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            false
          )}
        </div>
      </div>
    </div>
  );
}

export default AnimeWatch;
