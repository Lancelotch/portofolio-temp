import React, { Component } from 'react';
import category from '../../api/services/category'
import product from '../../api/services/product'
import HomePageContainer from './HomePageContainer'

class HomePage extends Component {
    constructor(props) {
        super(props);
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


    render() { 
        const {benefit, popularProduct, bestSellerProduct, mostClickProduct} = this.state
        const {match} = this.props
        console.log(benefit)
        return ( 
            <React.Fragment>
                <HomePageContainer
                    match={match}
                    //benefit={benefit}
                    //popularProduct={popularProduct}
                    bestSellerProduct={bestSellerProduct}
                    mostClickProduct={mostClickProduct} 
                />
            </React.Fragment>
         );
    }
}
 
export default HomePage;