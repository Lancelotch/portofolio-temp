import React, { useState, useEffect } from "react";
import { Icon, Carousel } from "antd";
import "./style.sass";
import { Link } from "react-router-dom";
import SkeletonCustom from "../Skeleton";
import Product from "../../repository/Product";
import Cards from "../Cards";
import { PATH_PRODUCT } from "../../services/path/product";

const SampleNextArrow = props => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        zIndex: "1",
        height: "60px",
        width: "60px",
        // opacity: "0.5",
        backgroundColor: "rgb(170, 170, 170, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: "145px",
        right: "0px"
      }}
      onClick={onClick}
    >
      <Icon
        type="right"
        style={{ color: "white", fontSize: "30px" }}
      />
    </div>
  );
};

const SamplePrevArrow = props => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        marginRight: "30px",
        zIndex: "1",
        height: "60px",
        width: "60px",
        // opacity: "0.5",
        backgroundColor: "rgb(170, 170, 170, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "25px",
        top: "145px"
      }}
      onClick={onClick}
    >
      <Icon
        type="left"
        style={{ color: "white", fontSize: "30px" }}
      />
    </div>
  );
};

function Recommend() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    let productsResp = await Product.getAll({
      loading: setLoading
    })
    if (productsResp.status === 200) {
      setProducts(productsResp.data.data)
    } else {
      setProducts([])
    }

  }
  const productsToShow = products.slice(0, 10);
  let sliderToClickLength = productsToShow.length <= 6 ? false : true
  const settings = {
    slidesToShow: 5,
    slidesToScroll: 2,
    dots: true,
    infinite: sliderToClickLength,
    speed: 1000,
    autoplaySpeed: 7000,
    autoplay: true,
    arrows: true,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: dots => (
      <div style={{ borderRadius: 10 }}>
        <ul className="dots"> {dots} </ul>
      </div>
    )
  };

  const slides = productsToShow.map((item, i) => {
    return (
      <Link to={`${PATH_PRODUCT.PRODUCT}/${item.id}`} key={i}>
        <Cards
          urlImage={item.image.defaultImage}
          title={item.name}
          price={item.price}
          playButton={item.videoUrl}
          type="recommend" />
      </Link>
    );
  });


  return (
    <div className="mp-slider-click-products">
      {loading ? (
        <SkeletonCustom
          count={4}
          height={300}
          leftMargin={13}
          rightMargin={13} />) :
        (<Carousel {...settings}>{slides}</Carousel>)
      }
    </div>
  );
}

export default Recommend;
