import React, { Component } from 'react'
import category from '../../api/services/category'
import { Carousel, Row, Col, Icon } from 'antd'
import { Link } from 'react-router-dom'
import './style.sass'
import Skeleton from "react-loading-skeleton";


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

class SliderHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sliderImages: []
    }
  }

  componentDidMount() {
    this.mounted = true
    this.getSliderHome()
  }

  componentWillUnmount(){
    this.mounted = false
  }

  getSliderHome = async () => {
    try {
      const payload = await category.sliderHome()
      if(this.mounted){
        this.setState({
          sliderImages: payload.data
        })
      }
      
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    const { sliderImages } = this.state
    const settings = {
      dots: false,
      speed: 2000,
      autoplaySpeed: 7000,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:false,
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
                {this.state.sliderImages.length < 1 ? (<Skeleton width={"100%"} height={376}/>):(slides)}
              </Carousel>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default SliderHome
