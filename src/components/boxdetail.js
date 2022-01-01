import parse from "html-react-parser";

function BoxAnimeDetail({
  cover,
  title,
  status,
  genres,
  season,
  description,
  width,
}) {
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
              Status : <span>{status}</span>
            </p>
            <p>
              Genres : <span>{genres}</span>
            </p>
            <p>
              Season : <span>{season}</span>
            </p>
          </div>
        </div>
        <div className="box-action">
          <span>{parse(description)}</span>
          <div>
            <div>
              <box-icon color="#fff" name="play"></box-icon>
            </div>
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
