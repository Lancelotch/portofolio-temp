import React, { Component } from 'react'
import category from '../../api/services/category'
import { Carousel, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import './style.sass'

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
      dots: true,
      speed: 999,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
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
            <div className="sliderHome" style={{ marginTop: 10 }}>
              <Carousel autoplay {...settings}>
                {slides}
              </Carousel>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default SliderHome
