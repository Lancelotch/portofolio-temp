import React, { Component } from 'react'
import { Row, Col, Slider } from 'antd'
import { connect } from 'react-redux'
import Header from 'components/Header'
import SliderHome from '../../components/SliderHome'
import category from '../../api/services/category'
import Benefit from '../../components/Benefit'
import product from '../../api/services/product'
import PopularProducts from '../../components/PopularProducts'
import 'sass/style.sass'

class HomePage extends Component {
  constructor () {
    super()
    this.state = {
      benefit: [],
      popularProduct: []
    }
  }

  componentDidMount () {
    this.getBenefit()
    this.getPopularProduct()
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
      const payload = await product.popularSearchProduct()
      this.setState({
        popularProduct: payload.data
      })
      
    } catch (error) {
      console.log(error)
    }
  } 



  render () {
    const { benefit, popularProduct } = this.state
    const {match} = this.props;
    
    return (
      <React.Fragment>
        <Row>
          <Col xs={24} md={24}>
            <Header match={match}/>
            <SliderHome />
            <Row type='flex' justify='center'>
                <Benefit benefit={benefit} />
            </Row>
            <Row type='flex' justify='center'>
              <PopularProducts 
                products = {popularProduct}
                maxNumber = {4}
              />
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
