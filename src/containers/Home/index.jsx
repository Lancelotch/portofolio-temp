import React, { Component } from 'react'
import { Row, Col, Slider, Button } from 'antd'
import { connect } from 'react-redux'
import Header from 'components/Header'
import SliderHome from '../../components/SliderHome'
import category from '../../api/services/category'
import Benefit from '../../components/Benefit'
import product from '../../api/services/product'
import BestSeller from '../../components/BestSellers'
import PopularProducts from '../../components/PopularProducts'
import Inspiration_1 from '../../assets/img/Inspiration_1.jpg'
import ClickProducts from '../../components/ClickProducts'
import Foother from '../../components/Footer'
import { Link } from 'react-router-dom'
import './style.sass'
import Footer from '../../components/Footer'

class HomePage extends Component {
  constructor () {
    super()
    this.state = {
      benefit: [],
      popularProduct: [],
      bestSellerProduct: [],
      mostClickProduct: []
    }
  }

  componentDidMount () {
    this.getBenefit()
    this.getPopularProduct()
    this.getBestSellerProduct()
    this.getMostClickProduct()
  }

  getBenefit = async () => {
    try {
      const payload = await category.benefit()
      this.setState({
        benefit: payload.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  getPopularProduct = async () => {
    try {
      const payload = await product.popularProduct()
      this.setState({
        popularProduct: payload.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  getBestSellerProduct = async () => {
    try {
      const payload = await product.popularProduct()
      this.setState({
        bestSellerProduct: payload.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  getMostClickProduct = async () => {
    try {
      const payload = await product.mostClickProduct()
      this.setState({
        mostClickProduct: payload.data.slice(0, 10)
      })
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    const {
      benefit,
      popularProduct,
      bestSellerProduct,
      mostClickProduct
    } = this.state
    console.log(mostClickProduct)

    return (
      <React.Fragment>
        <Row>
          <Col xs={24} md={24}>
            <Header />
            <SliderHome />
            <Row type='flex' justify='center'>
              <Benefit benefit={benefit} />
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
            <Row>
              <Link to='/'>
                <img className='inspiration-box' src={Inspiration_1} />
              </Link>
            </Row>
            <Row type='flex' justify='center'>
              <Col md={24}>
                <div style={{overflow:'hidden', width:'100%', backgroundColor:'black', paddingLeft:'20px', paddingRight:'40px'}}>
                  <ClickProducts products={mostClickProduct} />
                </div>
              </Col>
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

export default connect(mapStateToProps)(HomePage)
