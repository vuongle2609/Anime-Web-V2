function BoxAnimeList({ cover, title, status, season }) {
  return (
    <div className="col c-2-4">
      <div className="box-L-container">
        <div style={{ backgroundImage: `url('${cover}')` }}></div>
        <div>
          <p>{title}</p>
          <p>
            Status : <span>{status}</span>
          </p>
          <p>
            Season : <span>{season}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BoxAnimeList;
