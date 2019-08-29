import React, {  useState, useEffect } from 'react'
import { Carousel, Row, Col, Icon } from 'antd'
import { Link } from 'react-router-dom'
import './style.sass'
import Skeleton from "react-loading-skeleton";
import SliderBanner from '../../repository/SliderBanner';


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

function SliderHome() {

  const [sliderImages, setSliderImages] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    getSliderHome()
  },[])

  async function getSliderHome () {
    let sliderImages = await SliderBanner.getAll({
      loading : setLoading
    })
    if (sliderImages.status === 200) {
      setSliderImages(sliderImages.data.data) 
    } else {
      setSliderImages(null)
    }          
  }

  const settings = {
    dots: false,
    speed: 2000,
    autoplaySpeed: 7000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  }
  const slides = sliderImages.map((image, index) => {
    return (
      <React.Fragment key={index}>
        <Link to='/'>
          <img
            className='imageSlider'
            src={image.imageUrl}
            alt={image.type}
          />
        </Link>
      </React.Fragment>
    )
  })

  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <div className="sliderHome full-width" >
            <Carousel autoplay {...settings}>
              {loading? (<Skeleton width={"100%"} height={376} />) : (slides)}
            </Carousel>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}


export default SliderHome
