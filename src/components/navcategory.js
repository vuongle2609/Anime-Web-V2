import { Link } from "react-router-dom";

function NavCategory(props) {
  return (
    <div className="nav-category">
      <h2>{props.title}</h2>
      <Link to="/More" state={{ api: props.api }}>
        <span>
          {!props.isD || (
            <>
              <span>Show more</span>
              <box-icon color="#9e9eb9" name="chevron-right"></box-icon>
            </>
          )}
        </span>
      </Link>
    </div>
  );
}

export default NavCategory;
