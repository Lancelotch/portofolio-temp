import React, { Component } from 'react';
import {Row, Col, Card, Icon, Carousel} from 'antd'
import Slider from 'react-slick'


const SampleNextArrow = props => {
    const { className, style, onClick } = props
    return (
    <div className={className} style={{ marginRight: '30px', zIndex: '1' }}>
      <Icon
        type='right'
        style={{ color: 'red', fontSize: '100px' }}
        onClick={onClick}
      />
    </div>
  )

}

const SamplePrevArrow = props => {
    const { className, style, onClick } = props
  return (
    <div className={className} style={{ marginLeft: '30px', zIndex: '1' }}>
      <Icon
        type='left'
        style={{ color: 'red', fontSize: '30px' }}
        onClick={onClick}
      />
    </div>
  )
}

class ClickProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    
      


    render() {
        const {products} = this.props
        
        const settings = {
            dots: true,
            infinite: true,
            autoplay: 2000,
            slidesToShow: 5,
            slidesToScroll: 5,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
          };

        const slides = products.map(product => {
            return(
                <Col md={24}>
                    <Card
                        style={{
                            height: '330px',
                            width: '220px',
                            padding: '20px',
                            background: '#fffff',
                            borderRadius: '5px'
                        }}
                        cover={
                            <img
                            alt='example'
                            src={product.urlImage}
                            />
                        }
                    >
                     <div>
                        <p className='best__title'>{product.name}</p>
                        <p className='best__price'>{product.price} </p>
                    </div>  
                    </Card>
                </Col>

            )
        })

        return ( 
            <React.Fragment>
                <div >
                <Carousel autoplay {...settings}>
                    {slides}
                </Carousel>
                </div>
               
                {/* <Carousel  {...settings}>
                    {slides}
                </Carousel> */}

            </React.Fragment>
         );
    }
}
 
export default ClickProducts;