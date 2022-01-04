import { useState } from "react";
import NavSort from "./sortBar";
import AnimeBoxes from "./searchResults";

function RightRender({ apiFilter, firstSearch, setFirstSearch }) {
  const [display, setDisplay] = useState(false);

  const handleDL = () => {
    setDisplay(false);
  };

  const handleDD = () => {
    setDisplay(true);
  };

  return (
    <div className="right-bar">
      <NavSort display={display} setL={handleDL} setD={handleDD} />

      <AnimeBoxes display={display} apiFilter={apiFilter} firstSearch={firstSearch} setFirstSearch={setFirstSearch}/>
    </div>
  );
}

export default RightRender;
