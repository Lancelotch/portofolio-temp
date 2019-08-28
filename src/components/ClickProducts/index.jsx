import React, { useState, useEffect } from "react";
import currencyRupiah from "../../library/currency";
import { Card, Icon, Carousel } from "antd";
import "./style.sass";
import { pageUrlProductDetail } from "../../library/url";
import { Link } from "react-router-dom";
import SkeletonCustom from "../Skeleton";
import ButtonPlay from "../ButtonPlay";
import Product from "../../repository/Product";

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

function ClickProducts () {
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
          setProducts(null)
      }

  }
    const product = products.slice(0, 10);
    let sliderToClickLength = product.length <= 6 ? false : true
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
        <div style={{borderRadius: 10}}>
          <ul className="dots"> {dots} </ul>
        </div>
      )
    };

    const slides = product.map((item, i) => {
      return (
        <Link to={pageUrlProductDetail + item.id || "#"} key={i}>
          <Card
            className="card__style"
            cover={
              <div className="card__image-cover">
                <img
                  alt="example"
                  src={item.image.defaultImage}
                  className="card__image"
                />
                {item.videoUrl && <ButtonPlay type="thumbnail"/>}
              </div>
            }
          >
            <div className="card__info">
              <p style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: "1", overflow: "hidden", color: "#000000", fontSize: 16 }}>{item.name}</p>
              <p className="card__price">{currencyRupiah(item.price)}</p>
            </div>
          </Card>
        </Link>
      );
    });


    return (
      <div className="sliderClickProducts">
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

export default ClickProducts;
