import React, { Component } from 'react'
import { Row, Col, Slider, Button } from 'antd'
import { connect } from 'react-redux'
import Header from 'components/Header'
import SliderHome from '../../components/SliderHome'
import category from '../../api/services/category'
import {BenefitWithData} from '../../components/Benefit'
import product from '../../api/services/product'
import BestSeller from '../../components/BestSellers'
import PopularProducts from '../../components/PopularProducts'
import Inspiration_1 from '../../assets/img/Inspiration_1.jpg'
import ClickProducts from '../../components/ClickProducts'
import { Link } from 'react-router-dom'
import './style.sass'
import Footer from '../../components/Footer'
import strings from '../../localization/localization';

class HomePageContainer extends Component {

  render () {
    const {
      benefit,
      popularProduct,
      bestSellerProduct,
      mostClickProduct
    } = this.props    
    const {match} = this.props;
    console.log(mostClickProduct)

    return (
      <React.Fragment>
        <Row>
          <Col xs={24} md={24}>
            <Header match={match}/>
            <SliderHome />
            <Row type='flex' justify='center'>
              <BenefitWithData/>
            </Row>
            <Row type='flex' justify='center'>
              <PopularProducts products={popularProduct} maxNumber={4} />
            </Row>
            <Row>
              <Col>
                <div className='bestSellerBackground '>
                  <Row>
                    <Col md={4}>
                      <div className='best__box'>
                        <span className='best__fontOne'>Best</span>
                        <span className='best__fontTwo'>Seller</span>
                        <button className='best__button'> See more..</button>
                      </div>
                    </Col>
                    <Col md={20}>
                      <div style={{ paddingLeft: '150px' }}>
                        <BestSeller
                          products={bestSellerProduct}
                          maxNumber={4}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row >
              <Link to='/'>
                <img className='inspiration-box' src={Inspiration_1} />
              </Link>
            </Row>
            <Row type='flex' justify='center' >      
                <div  style={{marginTop:'80px', marginBottom:'30px',  width:'90%', marginLeft:'40px'}}>
                  <ClickProducts products={mostClickProduct} />
                </div>
            </Row>
            <Row>
              <Footer />
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
})

export default connect(mapStateToProps)(HomePageContainer)
