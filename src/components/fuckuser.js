import Dam from "../img/dam.gif";
import Chay from "../img/chay.gif";
import Nhay from "../img/nhay.gif";

function Fuckusers({ firstSearch, isLoading, text }) {
  if (firstSearch) {
    return (
      <>
        <div className="nothing">
          <img src={Nhay} className="nothing" alt="" />
          <span className="nothingT">Search something...</span>
        </div>
      </>
    );
  } else if (isLoading) {
    return (
      <>
        <div className="nothing load">
          <img src={Chay} className="nothing" alt="" />
          <span className="nothingT">Loading</span>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="nothing">
          <img src={Dam} className="nothing" alt="" />
          <span className="nothingT">{text ? text : 'wtf'}</span>
        </div>
      </>
    );
  }
}

export default Fuckusers;
