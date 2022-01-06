import { useEffect, useState } from "react";
import parse from "html-react-parser";
import BoxAnimeList from "./animeBoxList";
import Fuckusers from "./fuckuser";
import undef from "../img/banner/undef.jpg";
import mal from "../img/logo/mal.png";
import spotify from "../img/logo/Spotify_App_Logo.svg";
import anilist from "../img/logo/anilist.png";
import "@vime/core/themes/default.css";
import { Link, useLocation } from "react-router-dom";
import { Player, Audio, DefaultUi } from "@vime/react";

function AnimeDetailInfo({
  animeData,
  format,
  status,
  start_date,
  end_date,
  season,
}) {
  return (
    <div className="col c-2 l-3 m-12 s-12">
      <ul className="info-anime">
        <li>
          <p>Format</p>
          <span>{format}</span>
        </li>
        <li>
          <p>Episodes</p>
          <span>{animeData.episodes_count}</span>
        </li>
        <li>
          <p>Episode duration</p>
          <span>
            {animeData.status === 2
              ? "Unknown"
              : animeData.episode_duration + " Minutes"}
          </span>
        </li>
        <li>
          <p>Status</p>
          <span>{status}</span>
        </li>
        <li>
          <p>Start Date</p>
          <span>{start_date}</span>
        </li>
        <li>
          <p>End Date</p>
          <span>{animeData.status === 2 ? "Unknown" : end_date}</span>
        </li>
        <li>
          <p>Season</p>
          <span>{season}</span>
        </li>
        <li>
          <p>Year</p>
          <span>{animeData.season_year}</span>
        </li>
        <li>
          <p>Score</p>
          <span>{animeData.score}%</span>
        </li>
      </ul>
    </div>
  );
}

function AnimeDetailDetail({ animeData, addTags, openingData }) {
  const [prequel, setPrequel] = useState(false);
  const [sequel, setSequel] = useState(false);

  useEffect(() => {
    const fetchOAnimeData = async (id, callback) => {
      try {
        const res = await fetch(`https://api.aniapi.com/v1/anime/${id}`);
        const data = await res.json();
        callback(data.data);
      } catch {
        throw new Error(`cant get animes`);
      }
    };

    if (animeData.prequel !== undefined) {
      fetchOAnimeData(animeData.prequel, setPrequel);
    }
    if (animeData.sequel !== undefined) {
      fetchOAnimeData(animeData.sequel, setSequel);
    }
  }, []);

  return (
    <div className="col c-10 l-9 m-12 s-12">
      <div className="detail-anime">
        <a
          className="link-detail"
          href={`https://anilist.co/anime/${animeData.anilist_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={anilist} alt="" height={"30px"} />
          AniList
        </a>

        <a
          className="link-detail"
          href={`https://myanimelist.net/anime/${animeData.mal_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={mal} alt="" height={"30px"} />
          My Anime List
        </a>

        <div className="tags-anime">
          <h2 className="title-anime">Tags</h2>
          <div>
            {animeData.genres.map((tag, index) => {
              if (index < 3) {
                addTags(tag);
              }
              return <span key={index}>{tag}</span>;
            })}
          </div>
        </div>

        {animeData.trailer_url ? (
          <div className="trailer-anime">
            <h2 className="title-anime">Trailer</h2>
            <iframe
              title="trailer"
              src={animeData.trailer_url}
              width="80%"
              height="417px"
            ></iframe>
          </div>
        ) : (
          false
        )}

        {sequel || prequel ? (
          <>
            <h2 className="title-anime">Sequel and Prequel</h2>
            <div className="row">
              {sequel ? (
                <BoxAnimeList
                  cover={sequel.cover_image}
                  title={sequel.titles.en}
                  status={sequel.status}
                  genres={sequel.genres}
                  season={sequel.season_period}
                  year={sequel.season_year}
                  description={sequel.description}
                  width={"c-2-4 l-3 m-4 s-6"}
                  id={sequel.id}
                  newtab={"_blank"}
                />
              ) : (
                false
              )}
              {prequel ? (
                <BoxAnimeList
                  cover={prequel.cover_image}
                  title={prequel.titles.en}
                  status={prequel.status}
                  genres={prequel.genres}
                  season={prequel.season_period}
                  year={prequel.season_year}
                  description={prequel.description}
                  width={"c-2-4 l-3 m-4 s-6"}
                  id={prequel.id}
                  newtab={"_blank"}
                />
              ) : (
                false
              )}
            </div>
          </>
        ) : (
          false
        )}

        {openingData ? (
          <div className="songs-anime">
            <h2 className="title-anime">Openings - Endings</h2>
            <ul>
              {openingData.map((song, index) => (
                <li key={index}>
                  <div>
                    <div className="song-label">
                      <div>
                        <h2>{song.title}</h2>
                        <span>{song.artist}</span>
                      </div>

                      <a
                        className="link-detail"
                        href={song.open_spotify_url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Listen on spotify
                        <img src={spotify} width="30px" height="30px" alt="" />
                      </a>
                    </div>
                    <span>
                      <Player
                        theme="dark"
                        style={{
                          "--vm-player-theme": "#fbaa33",
                          "--vm-control-scale": "1",
                        }}
                      >
                        <Audio>
                          <source
                            data-src={song.preview_url}
                            type="video/mp4"
                          />
                        </Audio>

                        <DefaultUi />
                      </Player>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          false
        )}
      </div>
    </div>
  );
}

function ButtonPlay(props) {
  const [canPlaySub, setCanPlaySub] = useState(false);
  const [canPlayDub, setCanPlayDub] = useState(false);

  useEffect(() => {
    const checkSub = async (idAnime) => {
      try {
        const res = await fetch(
          `https://api.aniapi.com/v1/episode?anime_id=${idAnime}&source=gogoanime&locale=en`
        );
        const data = await res.json();
        if (data.status_code === 404) {
          setCanPlaySub(false);
        } else {
          setCanPlaySub(true);
        }
      } catch {}
    };

    const checkDub = async (idAnime) => {
      try {
        const res = await fetch(
          `https://api.aniapi.com/v1/episode?anime_id=${idAnime}&source=gogoanime_dub&locale=en`
        );
        const data = await res.json();
        if (data.status_code === 404) {
          setCanPlayDub(false);
        } else {
          setCanPlayDub(true);
        }
      } catch {}
    };

    checkSub(props.id);
    checkDub(props.id);
  }, []);

  const handleHistory = () => {
    if (!localStorage.getItem("history")) {
      const a = [
        {
          id: props.id,
          titles: props.title,
          status: props.status,
          season_period: props.season,
          cover_image: props.cover,
          season_year: props.year,
          genres: props.genres,
          descriptions: props.description,
        },
      ];
      localStorage.setItem("history", JSON.stringify(a));
    } else {
      const b = JSON.parse(localStorage.getItem("history"));

      const c = b.filter((anime) => {
        if (anime.id !== props.id) {
          return anime;
        }
      });

      c.unshift({
        id: props.id,
        titles: props.title,
        status: props.status,
        season_period: props.season,
        cover_image: props.cover,
        season_year: props.year,
        genres: props.genres,
        descriptions: props.description,
      });
      localStorage.setItem("history", JSON.stringify(c));
    }
  };

  return canPlaySub || canPlayDub ? (
    <Link
      to={`/Watch?id=${props.id}&sub=${canPlaySub}&dub=${canPlayDub}`}
      onClick={handleHistory}
    >
      <span className="detail-buttons-item ">
        <box-icon color="#fff" name="play"></box-icon>
        <p className="btn-item-watch buttons-item-label">Watch now</p>
      </span>
    </Link>
  ) : (
    <span className="no-video detail-buttons-item ">
      <box-icon color="#fff" name="play"></box-icon>
      <p className="btn-item-watch buttons-item-label">Watch now</p>
    </span>
  );
}

function ButtonCollection(props) {
  const [isCollected, setIsCollected] = useState(false);

  useEffect(() => {
    const b = JSON.parse(localStorage.getItem("collection"));
    if (b) {
      b.filter((anime) => {
        if (anime.id === props.id) {
          setIsCollected(true);
        }
      });
    }
  }, []);

  const handleCollect = () => {
    if (!localStorage.getItem("collection")) {
      const a = [
        {
          id: props.id,
          titles: props.title,
          status: props.status,
          season_period: props.season,
          cover_image: props.cover,
          season_year: props.year,
          genres: props.genres,
          descriptions: props.description,
        },
      ];
      localStorage.setItem("collection", JSON.stringify(a));
      setIsCollected(true);
    } else {
      const b = JSON.parse(localStorage.getItem("collection"));

      const c = b.filter((anime) => {
        if (anime.id !== props.id) {
          return anime;
        }
      });

      let a = !(b.length === c.length);

      if (a) {
        localStorage.setItem("collection", JSON.stringify(c));
        setIsCollected(false);
      } else {
        b.unshift({
          id: props.id,
          titles: props.title,
          status: props.status,
          season_period: props.season,
          cover_image: props.cover,
          season_year: props.year,
          genres: props.genres,
          descriptions: props.description,
        });
        localStorage.setItem("collection", JSON.stringify(b));
        setIsCollected(true);
      }
    }
  };

  return isCollected ? (
    <span className="detail-buttons-item collected" onClick={handleCollect}>
      <box-icon color="#fff" name="list-minus"></box-icon>
      <p className="item-label buttons-item-label">Unfavorite</p>
    </span>
  ) : (
    <span className="detail-buttons-item" onClick={handleCollect}>
      <box-icon color="#fff" name="list-plus"></box-icon>
      <p className="item-label buttons-item-label">Favorite</p>
    </span>
  );
}

function AnimeDetail() {
  let location = useLocation();
  let query = new URLSearchParams(location.search);
  const id = query.get("id");
  const [animeData, setAnimeData] = useState(false);
  const [openingData, setOpeningData] = useState(false);
  let tags = [];
  let format, status, start_date, end_date, season;

  useEffect(() => {
    document.querySelector(".header").classList.add("active");
    document.querySelector(".box-nav").classList.remove("active");
    document.querySelector(".back-btn").classList.add("active");

    fetch(`https://api.aniapi.com/v1/anime/${id}`)
      .then((res) => res.json())
      .then((data) => setAnimeData(data.data));

    fetch(`https://api.aniapi.com/v1/song?anime_id=${id}`)
      .then((res) => res.json())
      .then((data) => setOpeningData(data.data.documents));

    return () => {
      document.querySelector(".header").classList.remove("active");
      document.querySelector(".back-btn").classList.remove("active");
    };
  }, []);

  const addTags = (newTag) => {
    tags.push(newTag);
  };

  const handleData = (data) => {
    let sdate = new Date(data.start_date).toLocaleDateString();
    let edate = new Date(data.end_date).toLocaleDateString();
    start_date = String(sdate);
    end_date = String(edate);

    switch (data.status) {
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
        break;
      default:
    }

    switch (data.season_period) {
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
        break;
      default:
    }

    switch (data.format) {
      case 0:
        format = "TV";
        break;
      case 1:
        format = "TV Short";
        break;
      case 2:
        format = "Movie";
        break;
      case 3:
        format = "Special";
        break;
      case 4:
        format = "OVA";
        break;
      case 5:
        format = "ONA";
        break;
      case 6:
        format = "Music";
        break;
      default:
    }
  };
  if (animeData) handleData(animeData);

  return animeData ? (
    <div className="anime-detail">
      <div
        className="banner"
        style={{
          backgroundImage: `url("${
            animeData.banner_image === undefined
              ? undef
              : animeData.banner_image
          }")`,
        }}
      ></div>
      <div className="grid wide">
        <div className="row header-detail">
          <div className="col m-4 c-2-4 l-3 s-4">
            <img
              src={animeData.cover_image}
              className="detail-cover"
              width="100%"
              height="auto"
              alt=""
            />
          </div>
          <div className="col c-9 l-9 m-8 s-8">
            <div className="anime-detail1">
              <h2 className="anime-detail-title">{animeData.titles.en}</h2>
              <p className="anime-detail-subtitle">{animeData.titles.jp}</p>
              <div className="anime-detail-space">a</div>
              <div className="pc-btns anime-detail-butons">
                <ButtonPlay
                  id={animeData.id}
                  title={animeData.titles}
                  status={animeData.status}
                  season={animeData.season_period}
                  cover={animeData.cover_image}
                  year={animeData.season_year}
                  genres={animeData.genres}
                  description={animeData.descriptions}
                />

                <ButtonCollection
                  id={animeData.id}
                  title={animeData.titles}
                  status={animeData.status}
                  season={animeData.season_period}
                  cover={animeData.cover_image}
                  year={animeData.season_year}
                  genres={animeData.genres}
                  description={animeData.descriptions}
                />

                <span className="detail-buttons-item">
                  <box-icon color="#fff" name='chevrons-right' ></box-icon>
                  <p className="item-label buttons-item-label">Continue</p>
                </span>
                <span className="detail-buttons-item">
                  <box-icon color="#fff" name="block"></box-icon>
                  <p className="item-label buttons-item-label">Black list</p>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col phone-btns c-12 l-12 m-12 s-12">
            <div className="anime-detail-butons">
              <ButtonPlay
                id={animeData.id}
                title={animeData.titles}
                status={animeData.status}
                season={animeData.season_period}
                cover={animeData.cover_image}
                year={animeData.season_year}
                genres={animeData.genres}
                description={animeData.descriptions}
              />

              <ButtonCollection
                id={animeData.id}
                title={animeData.titles}
                status={animeData.status}
                season={animeData.season_period}
                cover={animeData.cover_image}
                year={animeData.season_year}
                genres={animeData.genres}
                description={animeData.descriptions}
              />

              <span className="detail-buttons-item">
                <box-icon color="#fff" name='chevrons-right' ></box-icon>
                <p className="item-label buttons-item-label">Continue</p>
              </span>
              <span className="detail-buttons-item">
                <box-icon color="#fff" name="block"></box-icon>
                <p className="item-label buttons-item-label">Black list</p>
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col c-12">
            <span className="description">
              {animeData.descriptions.en === null
                ? ""
                : parse(animeData.descriptions.en)}
            </span>
          </div>
        </div>

        <div className="row">
          <AnimeDetailInfo
            animeData={animeData}
            status={status}
            format={format}
            start_date={start_date}
            end_date={end_date}
            season={season}
          />

          <AnimeDetailDetail
            animeData={animeData}
            status={status}
            format={format}
            start_date={start_date}
            end_date={end_date}
            season={season}
            openingData={openingData}
            addTags={addTags}
          />
        </div>
      </div>
    </div>
  ) : (
    <Fuckusers firstSearch={false} isLoading={true} />
  );
}

export default AnimeDetail;
