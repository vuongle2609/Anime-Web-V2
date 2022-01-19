import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useEffect, useState } from "react";

function ActionButtonsWatch(props) {
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

    return () => {

    }
  }, []);

  const handleCollect = (props) => {
    if (!localStorage.getItem("collection")) {
      const a = [
        {
          id: props.id,
          titles: props.titles,
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
          titles: props.titles,
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

  return (
    <div>
      <Link to={`/AnimeDetail?id=${props.id}`}>
        <div className="play-btn">
          <box-icon color="#fff" name="play"></box-icon>
        </div>
      </Link>
      {isCollected ? (
        <div onClick={() => {
          handleCollect(props)
        }} style={{ backgroundColor: "#ff7675" }}>
          <box-icon color="#fff" name="heart" type="solid"></box-icon>
        </div>
      ) : (
        <div onClick={() => {
          handleCollect(props)
        }}>
          <box-icon color="#fff" name="heart" type="solid"></box-icon>
        </div>
      )}
    </div>
  );
}

function ActionButtonsBlock(props) {
  const handleBlock = () => {
    const blockObj = JSON.parse(localStorage.blacklist);

    const newBlacklist = blockObj.filter((obj) => {
      if (obj.id !== props.id) {
        return obj;
      }
    });

    localStorage.setItem("blacklist", JSON.stringify(newBlacklist));
    props.settrigger(!props.trigger);
  };

  return (
    <div>
      <div onClick={handleBlock} style={{ backgroundColor: "#ff0000" }}>
        <box-icon color="#fff" name="block"></box-icon>
      </div>
    </div>
  );
}

function BoxAnimeDetail({
  cover,
  title,
  titles,
  status,
  genres,
  season,
  year,
  description,
  width,
  id,
  block,
  trigger,
  settrigger,
  display,
setDisplay,
}) {
  let isBlock = 0;
  let box_status;
  let box_season;
  let box_genres;
  let box_description;
  switch (status) {
    case 0:
      box_status = "Finished";
      break;
    case 1:
      box_status = "Releasing";
      break;
    case 2:
      box_status = "Not yet released";
      break;
    case 3:
      box_status = "Cancelled";
      break;
    default:
  }

  if (description.en === "" || description.en === null) {
    box_description = "This anime doesn't has English description yet";
  } else {
    box_description = description.en;
  }

  switch (season) {
    case 0:
      box_season = "Winter";
      break;
    case 1:
      box_season = "Spring";
      break;
    case 2:
      box_season = "Summer";
      break;
    case 3:
      box_season = "Fall";
      break;
    case 4:
      box_season = "";
      break;
    default:
  }

  if (localStorage.blacklist) {
    const local = JSON.parse(localStorage.blacklist);
    const ll = local.length;
    for (let i = 0; i < ll; i++) {
      local[i].id === id ? isBlock++ : (isBlock += 0);
    }
  }

  box_genres = genres[0] + " ," + genres[1];

  let box;
  if (isBlock !== 0) {
    if (!block) {
      box = false;
    } else {
      box = (
        <div className={`col ${width}`}>
          <div className="box-D-container">
            <div
              className="box-D-img"
              style={{ backgroundImage: `url("${cover}")` }}
            ></div>
            <div className="box-main-info">
              <div>
                <div>
                  <h3>{title}</h3>
                </div>
                <p>
                  Status : <span>{box_status}</span>
                </p>
                <p>
                  Genres : <span>{box_genres}</span>
                </p>
                <p>
                  Season :{" "}
                  <span>
                    {box_season ? box_season + " " + year : "Unknown"}
                  </span>
                </p>
              </div>
            </div>
            <div className="box-action">
              <span>{parse(box_description)}</span>
              <ActionButtonsBlock
                display={display}
                setDisplay={setDisplay}
                id={id}
                block={block}
              />
            </div>
          </div>
        </div>
      );
    }
  } else if (isBlock === 0) {
    box = (
      <div className={`col ${width}`}>
        <div className="box-D-container">
          <div
            className="box-D-img"
            style={{ backgroundImage: `url("${cover}")` }}
          ></div>
          <div className="box-main-info">
            <div>
              <div>
                <h3>{title}</h3>
              </div>
              <p>
                Status : <span>{box_status}</span>
              </p>
              <p>
                Genres : <span>{box_genres}</span>
              </p>
              <p>
                Season :{" "}
                <span>{box_season ? box_season + " " + year : "Unknown"}</span>
              </p>
            </div>
          </div>
          <div className="box-action">
            <span>{parse(box_description)}</span>
            <ActionButtonsWatch
              settrigger={settrigger}
              trigger={trigger}
              titles={titles}
              status={status}
              season={season}
              cover={cover}
              year={year}
              genres={genres}
              description={description}
              id={id}
              block={block}
            />
          </div>
        </div>
      </div>
    );
  }

  return box;
}

export default BoxAnimeDetail;
