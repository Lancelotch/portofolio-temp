import React, { Component } from 'react'
// import { connect } from 'react-redux'
import Benefit from '../../components/Benefit'
import PopularProducts from '../../components/PopularProducts'

import './style.sass' 

export default class HomePage extends Component {
  render () {
    const { benefit, popularProduct } = this.props;

    return (
      <React.Fragment>
          {/* <Benefit benefit={benefit} /> */}
          <PopularProducts products={popularProduct} maxNumber={4} />
      </React.Fragment>
    )
  }
}

// const mapStateToProps = state => ({
//   isAuthenticated: state.authentication.isAuthenticated
// })

// export default connect(mapStateToProps)(HomePage)
// export default connect(mapStateToProps)(HomePage)
