import React, { Component, Suspense } from 'react'
import { Row, Col, BackTop, Spin, Card } from 'antd'
import { connect } from 'react-redux'
import Header from 'components/Header'
import 'sass/style.sass'
import strings from '../../localization/localization'
import InfiniteScroll from 'react-infinite-scroll-component'
import product from '../../api/services/product'
import './style.sass'
import SkeletonProduct from '../SkeletonProduct/SkeletonProduct'

const Products = React.lazy(() => import('../../components/Products'))

class CategoryPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      productList: [],
      hasMore: true,
      page: 0,
      categoryId: this.props.match.params.categoryId,
      isProductAvailable: false,
      loadingSkeleton: true
    }
  }

  getProductList = async () => {
    const { productList, page, categoryId } = this.state
    const request = {
      page: page,
      categoryId: categoryId
    }
    try {
      const nextProduct = await product.listProductCategory(request)
      console.log(nextProduct)

      this.setState({
        productList: productList.concat(nextProduct.data),
        page: page + 1,
        limit: nextProduct.element,
        isProductAvailable: true
      })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount () {
    this.getProductList()
  }

  fetchMoreData = () => {
    const { productList, limit, hasMore } = this.state
    console.log(productList.length, hasMore, limit)

    if (productList.length >= limit) {
      this.setState({ hasMore: false })
    } else {
      this.getProductList()
    }
  }

  infiniteScroll = () => {
    const { productList, hasMore } = this.state
    return (
      <InfiniteScroll
        dataLength={productList.length}
        next={this.fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className='spin'>
            <Spin size='large' />
          </div>
        }
        endMessage={
          <div>
            <BackTop />
          </div>
        }
      >
        <Suspense fallback={<SkeletonProduct count={20} />}>
          <Products productList={productList} />
        </Suspense>
      </InfiniteScroll>
    )
  }

  renderProducts = () => {
    return this.state.isProductAvailable ? (
      this.infiniteScroll()
    ) : (
      <SkeletonProduct count={20} />
    )
  }

  render () {
    const { match } = this.props
    const categoryTextResult = strings.formatString(
      strings.category_text_result,
      'limit',
      'sepatu'
    )
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Header match={match} />
            <div className='container'>
              <p>{categoryTextResult}</p>
              {this.renderProducts()}
            </div>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
})

export default connect(mapStateToProps)(CategoryPage)
