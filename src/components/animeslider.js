function SliderBox(props) {
  return (
    <div
      style={{
        backgroundImage: `url('${props.img}')`,
      }}
      className="slider-items"
    >
      <div>
        <h2>
          {props.title}
        </h2>
        <span>
          Genre:
          <span>{props.genres}</span>
        </span>
      </div>
    </div>
  );
}

export default SliderBox;
