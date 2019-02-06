import React from 'react'
import { Row, Col, Icon, Avatar } from 'antd'
import CurrencyRp from '../../Typography/CurrencyRp'
import CartVariants from '../../Variant/CartVariants'

const ItemInvoiceDetail = props => {
  return (
    <React.Fragment>
      <Row style={{ marginTop: '10px' }}>
        <Col xs={{ span: 8 }} md={{ span: 8 }}>
          <Avatar shape='square' size={100} src={props.imageUrl} />
        </Col>
        <Col xs={{ span: 14 }} md={{ span: 14 }}>
          <h4 style={{ marginTop: '-5px' }}>{props.title.trim()}</h4>
          <div className='priceInvoiceCustomerDetail'>
            <CurrencyRp price={props.price} />
          </div>
          <Row>
            <div style={{ marginTop: '10px' }}>
              <Col xs={{ span: 8 }} md={{ span: 8 }}>
                <span style={{ color: '#007E80' }}>Jumlah :</span>
              </Col>
              <Col xs={{ span: 14 }} md={{ span: 14 }}>
                <b
                  style={{
                    fontSize: '13px',
                    textAlign: 'left',
                    color: '#007E80'
                  }}
                >
                  {props.item}
                </b>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 24 }}>
                <CartVariants variants={props.variants} />
              </Col>
            </div>
          </Row>
        </Col>
        <Col xs={{ span: 8 }} md={{ span: 8 }}>
          <span>Catatan</span>
        </Col>
        <Col xs={{ span: 14 }} md={{ span: 14 }}>
          <b>{props.noted}</b>
        </Col>
        <Col xs={{ span: 8 }} md={{ span: 8 }}>
          <span>Pengiriman : </span>
        </Col>
        <Col xs={{ span: 14 }} md={{ span: 14 }}>
          <b style={{ fontSize: '13px', textAlign: 'left' }}>
            {props.courier.courierCode +
              ' ' +
              props.courier.serviceCode +
              ' ' +
              props.courier.estimation}
          </b>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default ItemInvoiceDetail
