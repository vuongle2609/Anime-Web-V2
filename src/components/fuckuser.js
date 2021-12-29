import Dam from "../img/dam.gif";
import Chay from "../img/chay.gif";
import Nhay from "../img/nhay.gif";

function Fuckusers({ firstSearch, isLoading }) {
  if (firstSearch) {
    return (
      <>
        <div className="nothing">
          <img src={Nhay} className="nothing" alt="" />
          <span className="nothingT">Nhap cai gi di ban</span>
        </div>
      </>
    );
  } else if (isLoading) {
    return (
      <>
        <div className="nothing">
          <img src={Chay} className="nothing" alt="" />
          <span className="nothingT">Dang tai</span>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="nothing">
          <img src={Dam} className="nothing" alt="" />
          <span className="nothingT">Ban da nhap cai lon gi dau</span>
        </div>
      </>
    );
  }
}

export default Fuckusers;
