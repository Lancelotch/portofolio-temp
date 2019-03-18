import React, { Component } from 'react'
import { Row, Col, Slider, Button } from 'antd'
import { connect } from 'react-redux'
import Header from '../../components/Header'
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
// import Footer from '../../components/Footer'
import HomePage from '.'

class HomeContainer extends Component {
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
    const { benefit, popularProduct} = this.state
    const {match} = this.props;

    return (
      <React.Fragment>
        <HomePage 
            benefit = {benefit}
            popularProduct = {popularProduct}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
})

export default connect(mapStateToProps)(HomeContainer)
// export default HomeContainer
