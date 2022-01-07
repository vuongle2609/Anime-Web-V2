import { Link } from "react-router-dom";

function BoxAnimeList({
  cover,
  title,
  status,
  season,
  year,
  id,
  width,
  block,
}) {
  let box_status;
  let box_season;
  let isBlock = 0;

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

  let box 
  if (isBlock !== 0) {
    if (!block) {
      box = false;
    } else {
      box = <div className={`col ${width}`}>
          <Link to={`/AnimeDetail?id=${id}`}>
            <div className="box-L-container">
              <div style={{ backgroundImage: `url('${cover}')` }}></div>
              <div>
                <p>{title}</p>
                <p>
                  Status : <span>{box_status}</span>
                </p>
                <p>
                  Season :{" "}
                  <span>
                    {box_season ? box_season + " " + year : "Unknown"}
                  </span>
                </p>
              </div>
            </div>
          </Link>
        </div>
      
    }
  } else if (isBlock === 0) {
    box = <div className={`col ${width}`}>
        <Link to={`/AnimeDetail?id=${id}`}>
          <div className="box-L-container">
            <div style={{ backgroundImage: `url('${cover}')` }}></div>
            <div>
              <p>{title}</p>
              <p>
                Status : <span>{box_status}</span>
              </p>
              <p>
                Season :{" "}
                <span>
                  {box_season ? box_season + " " + year : "Unknown"}
                </span>
              </p>
            </div>
          </div>
        </Link>
      </div>
    ;
  }
  return box
  ;
}

export default BoxAnimeList;
