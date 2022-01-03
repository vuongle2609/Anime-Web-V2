import { Link } from "react-router-dom";
import parse from "html-react-parser";

function BoxAnimeDetail({
  cover,
  title,
  status,
  genres,
  season,
  year,
  description,
  width,
  id,
}) {
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
  }

  if (description.en === "" || description.en === null) {
    box_description = "This anime doesn't has an English description yet";
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
  }

  box_genres = genres[0] + " ," + genres[1];
  return (
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
              <box-icon color="#fff" name="dots-vertical-rounded"></box-icon>
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
          <div>
            <Link to={`/AnimeDetail?id=${id}`} >
              <div className="play-btn">
                <box-icon color="#fff" name="play"></box-icon>
              </div>
            </Link>
            <div>
              <box-icon
                color="#fff"
                name="add-to-queue"
                type="solid"
              ></box-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxAnimeDetail;
