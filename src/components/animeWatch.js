import { useState, useEffect } from "react";
import {
  Player,
  Video,
  DefaultUi,
  DefaultControls,
  Ui,
  LoadingScreen
} from "@vime/react";
import "@vime/core/themes/default.css";
import chay from "../img/chay.gif";
import { useLocation } from "react-router-dom";

function AnimeWatch() {
  const location = useLocation();
  let query = new URLSearchParams(location.search);
  const id = query.get("id");
  const sub = query.get("sub");
  const dub = query.get("dub");
  const [subdata, setSubdata] = useState(false);
  const [dubdata, setDubdata] = useState(false);
  const [animedata, setAnimedata] = useState(false);
  const [videoSrc, setVideoSrc] = useState(false);
  const [currentEp, setCurrentEp] = useState(false);
  const [currentType, setCurrentType] = useState(false);
  const [choose, setChoose] = useState(false);

  useEffect(() => {
    const getSub = async (idAnime) => {
      try {
        const res = await fetch(
          `https://api.aniapi.com/v1/episode?anime_id=${idAnime}&source=gogoanime&locale=en`
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
          `https://api.aniapi.com/v1/episode?anime_id=${idAnime}&source=gogoanime_dub&locale=en`
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
      setCurrentType("sub");
    }

    if (dub) {
      getDub(id);
      if (!currentType) {
        setCurrentType("dub");
      }
    }
  }, []);

  return (
    <div className="wide grid body">
      <div className="row">
        <div className="col c-12 anime-watch">
          <h1>
            {animedata ? animedata.titles.en : false} - {!choose ? 'Choose your episode' : 'Episode ' + currentEp}
          </h1>
          <div className="anime-video">
            <Player>
              <Video crossOrigin="" poster={chay}>
                <source data-src={videoSrc} type="video/mp4" />
              </Video>

              <DefaultUi noControls>
                <DefaultControls hideOnMouseLeave activeDuration={2000} />
              </DefaultUi>
              <Ui>
              
              </Ui>
            </Player>
          </div>
          {subdata ? (
            <div className="list-ep">
              <h3>English Sub</h3>
              <ul>
                {subdata.map((ep, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setVideoSrc(ep.video);
                      setCurrentEp(ep.number);
                      setCurrentType("sub");
                      setChoose(true)
                    }}
                    className={
                      ep.number === currentEp && currentType === "sub"
                        ? "active"
                        : ""
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
                      setChoose(true)
                    }}
                    className={
                      ep.number === currentEp && currentType === "dub"
                        ? "active"
                        : ""
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
