import { useState } from "react";
import FilterBar from "./filterbar";
import RightRender from "./rightrender";

function Search() {
  const [season, setSeason] = useState();
  const [status, setstatus] = useState();
  const [genres, setGenres] = useState([]);
  const [title, setTitle] = useState("");
  const [apiFilter, setapiFilter] = useState("");
  const [firstSearch, setFirstSearch] = useState(true);

  const seasonHandle = (value) => {
    setSeason(value);
  };

  const statusHandle = (value) => {
    setstatus(value);
  };

  const genresHandle = (value) => {
    setGenres((prev) => {
      const isChecked = genres.includes(value);
      if (isChecked) {
        return genres.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const titleHandle = (value) => {
    setTitle(value);
  };

  const handleClickFilter = () => {
    if (
      season === undefined &&
      status === undefined &&
      genres.length === 0 &&
      title === ""
    ) {
      setapiFilter("");
    } else {
      const genresString = genres.join(",").split(" ").join("%20");
      setapiFilter(() => {
        return `https://api.aniapi.com/v1/anime?title=${title}${
          status ? `&status=${status}` : ""
        }${season ? `&season=${season}` : ""}${
          genresString !== [] ? `&genres=${genresString}` : ""
        }&nsfw=true`;
      });
    }
  };

  return (
    <>
      <div className="body grid wide search">
        <div className="body-container row">
          <div className="left-container col c-3">
            <FilterBar
              seasonHandle={seasonHandle}
              titleHandle={titleHandle}
              handleClickFilter={handleClickFilter}
              statusHandle={statusHandle}
              genresArray={genres}
              genresHandle={genresHandle}
            />
          </div>
          <div className="right-container col c-9">
            <RightRender
              apiFilter={apiFilter}
              firstSearch={firstSearch}
              setFirstSearch={setFirstSearch}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Search
