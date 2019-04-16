import React, { Component } from 'react'
import './style.sass'
import strings from '../../localization/localization'
import { Card, Row, Col, Divider, Button } from 'antd'
import currencyRupiah from '../../library/currency'

class OrderSummary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      subTotal: this.props.subTotal,
      viaRoute: this.props.viaRoute,
      viaRoutePrice: this.props.viaRoutePrice
    }
  }

  render () {
    const { subTotal, viaRoute, viaRoutePrice } = this.props
    const {visible} = this.state
    const total = subTotal + viaRoutePrice
    const productDetail = localStorage.getItem("product")
    console.log(productDetail);
    
    return (
      <Card title={strings.order_summary} className='card__Style'>
        <Row className='card__Content'>
          <Col span={12}>
            <p>{strings.sub_total}</p>
            {strings.international_shipping}
            <br />
            {viaRoute}
          </Col>
          <Col span={12} className='card__ColumnLeft'>
            <p className='price'>{currencyRupiah(subTotal)}</p>
            <p className='card__ColumnLeftVia'>
              <br />
              {currencyRupiah(viaRoutePrice)}
            </p>
          </Col>
        </Row>
        <Divider />
        <Row className='rowUnderDivider'>
          <Col span={12}>
            <b>{strings.sub_total}</b>
          </Col>
          <Col span={12} className='card__ColumnLeft'>
            <p className='price'>{currencyRupiah(total)}</p>
          </Col>
          <div className='ordersummary'>
            <Button className='card__Button' onClick={this.props.onOrder}>
              {strings.choose_payment_methods}
            </Button>
          </div>
        </Row>
      </Card>
    )
  }
}

export default OrderSummary;
