import SliderBox from "./sliderItem";
import NavCategory from './navcategory'
import Slider from "react-slick";
import gate from "../img/banner/gate.jpg";
import metal from "../img/banner/metal.jpg";
import kimi from "../img/banner/kimi.png";
import death from "../img/banner/death.png";
import suzu from "../img/banner/suzu.png";
import { Link } from 'react-router-dom'

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
    <div className="row home-slider">
      <NavCategory title="Featured" isD={false} />
      <div className="col c-12 slider">
        <Slider {...settings}>
          
          <div className="slider-cover">
          <Link to="/AnimeDetail?id=1862">
            <SliderBox
              title="Stein;Gate"
              genres="Drama, Sci-Fi, Suspense"
              img={gate}
            />
            </Link>
          </div>
          
          <div className="slider-cover">
          <Link to="/AnimeDetail?id=1487">
            <SliderBox
              title="Fullmetal Alchemist: Brotherhood"
              genres="Action, Adventure, Comedy, Drama, Fantasy"
              img={metal}
            />
            </Link>
          </div>
          
          <div className="slider-cover">
          <Link to="/AnimeDetail?id=6529">
            <SliderBox
              title="Kimi no Na wa"
              genres="Drama, Romance, Supernatural"
              img={kimi}
            />
            </Link>
          </div>
          
          <div className="slider-cover">
          <Link to="/AnimeDetail?id=643">
            <SliderBox
              title="Death Note"
              genres="Mystery, Supernatural, Suspense"
              img={death}
            />
            </Link>
          </div>
          
          <div className="slider-cover">
          <Link to="/AnimeDetail?id=427">
            <SliderBox
              title="Suzumiya Haruhi no Shoushitsu"
              genres="Comedy, Mystery, Romance, Sci-Fi, Supernatural"
              img={suzu}
            />
            </Link>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default HomeSlider;
