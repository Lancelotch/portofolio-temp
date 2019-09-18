import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";
import "./style.sass";
import Skeleton from "react-loading-skeleton";
import Banner from "../../repository/Banner";

function SliderHome() {
  const [sliderImages, setSliderImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSliderHome();
  }, []);

  async function getSliderHome() {
    let sliderImages = await Banner.getAll({
      loading: setLoading
    });
    if (sliderImages.status === 200) {
      setSliderImages(sliderImages.data.data);
    } else {
      setSliderImages([]);
    }
  }

  const settings = {
    dots: false,
    speed: 2000,
    autoplaySpeed: 7000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const slides = sliderImages.map((image, index) => {
    return (
      <React.Fragment key={index}>
        <Link to="/">
          <img className="imageSlider" src={image.imageUrl} alt={image.type} />
        </Link>
      </React.Fragment>
    );
  });

  return (
    <React.Fragment>
      <div className="sliderHome full-width">
        <Carousel autoplay {...settings}>
          {loading ? <Skeleton width={"100%"} height={376} /> : slides}
        </Carousel>
      </div>
    </React.Fragment>
  );
}

export default SliderHome;
