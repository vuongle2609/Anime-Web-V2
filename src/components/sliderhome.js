import SliderBox from "./sliderItem";
import NavCategory from './navcategory'
import Slider from "react-slick";
import gate from "../img/banner/gate.jpg";
import metal from "../img/banner/metal.jpg";
import code from "../img/banner/code.jpg";
import kimi from "../img/banner/kimi.png";
import death from "../img/banner/death.png";
import suzu from "../img/banner/suzu.png";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="right-arrow arrows">
      <box-icon
        color="#9e9eb9"
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
        size="38px"
        name="chevron-right"
      ></box-icon>
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="left-arrow arrows">
      <box-icon
        color="#9e9eb9"
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
        size="38px"
        name="chevron-right"
        rotate="180"
      ></box-icon>
    </div>
  );
}

function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          draggable: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="row">
      <NavCategory title="Featured" isD={false} />
      <div className="col c-12 slider">
        <Slider {...settings}>
          <div className="slider-cover">
            <SliderBox
              title="Stein;Gate"
              genres="Drama, Sci-Fi, Suspense"
              img={gate}
            />
          </div>
          <div className="slider-cover">
            <SliderBox
              title="Fullmetal Alchemist: Brotherhood"
              genres="Action, Adventure, Comedy, Drama, Fantasy"
              img={metal}
            />
          </div>
          <div className="slider-cover">
            <SliderBox
              title="Code Geass"
              genres="Action, Drama, Sci-Fi"
              img={code}
            />
          </div>
          <div className="slider-cover">
            <SliderBox
              title="Kimi no Na wa"
              genres="Drama, Romance, Supernatural"
              img={kimi}
            />
          </div>
          <div className="slider-cover">
            <SliderBox
              title="Death Note"
              genres="Mystery, Supernatural, Suspense"
              img={death}
            />
          </div>
          <div className="slider-cover">
            <SliderBox
              title="Suzumiya Haruhi no Shoushitsu"
              genres="Comedy, Mystery, Romance, Sci-Fi, Supernatural"
              img={suzu}
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default HomeSlider;