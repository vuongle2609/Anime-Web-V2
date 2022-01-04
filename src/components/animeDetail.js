import { useEffect, useState } from "react";
import parse from "html-react-parser";
import BoxAnimeList from "./animeBoxList";
import Fuckusers from "./fuckuser";
import undef from "../img/banner/undef.jpg";
import mal from "../img/logo/mal.png";
import spotify from "../img/logo/Spotify_App_Logo.svg";
import anilist from "../img/logo/anilist.png";
import "@vime/core/themes/default.css";
import { useLocation } from "react-router-dom";
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
    <div className="col c-2">
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
    <div className="col c-10">
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

        {prequel ? (
          <>
            <h2 className="title-anime">Prequel</h2>
            <div className="row">
              <BoxAnimeList
                cover={prequel.cover_image}
                title={prequel.titles.en}
                status={prequel.status}
                genres={prequel.genres}
                season={prequel.season_period}
                year={prequel.season_year}
                description={prequel.description}
                width={"c-2-4"}
                id={prequel.id}
                newtab={"_blank"}
              />
            </div>
          </>
        ) : (
          false
        )}
        {sequel ? (
          <>
            <h2 className="title-anime">Sequel</h2>
            <div className="row">
              <BoxAnimeList
                cover={sequel.cover_image}
                title={sequel.titles.en}
                status={sequel.status}
                genres={sequel.genres}
                season={sequel.season_period}
                year={sequel.season_year}
                description={sequel.description}
                width={"c-2-4"}
                id={sequel.id}
                newtab={"_blank"}
              />
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
                    <div>
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
      <div className="grid wide ">
        <div className="header-anime">
          <div
            className="cover"
            style={{
              backgroundImage: `url("${animeData.cover_image}")`,
            }}
          ></div>
          <div className="detail">
            <div>
              <h1>{animeData.titles.en}</h1>
              <span>{animeData.titles.jp}</span>
            </div>
            <div>
              <span>Watch now</span>
              <span>
                <box-icon color="#fff" name="list-plus"></box-icon>
                Add to collection
              </span>
              <span>
                <box-icon color="#fff" name="play"></box-icon>
                Continue Watch
              </span>
              <span>
                <box-icon color="#fff" name="block"></box-icon>
                Black list
              </span>
            </div>
          </div>
        </div>

        <span className="description">
          {animeData.descriptions.en === null
            ? ""
            : parse(animeData.descriptions.en)}
        </span>

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