import React from 'react'
import { Row, Col, Avatar } from 'antd'
import CurrencyRp from '../../Typography/CurrencyRp'

const ItemInvoiceCustomer = props => {
  const responseInvoiceDetail = {
    fontWeight: 'unset',
    color: '#9B9B9B',
    padding: '10px',
    border: '1px solid #E5E4E4',
    borderRadius: '2px',
    backgroundColor: '#FFF6EF'
  }
  return props.indexes.map((index, idx) => {
    return (
      <React.Fragment>
            <Row>
              <Col xs={{ span: 6 }} md={{ span: 6 }}>
                <Avatar shape='square' size={100} src={index.image} />
              </Col>
              <Col xs={{ span: 6 }} md={{ span: 6 }}>
                {index.name.length > 50
                  ? index.name.trim().substring(0, 50) + ' . . .'
                  : index.name}
              </Col>
              <Col xs={{ span: 6 }} md={{ span: 6 }}>
                <div style={responseInvoiceDetail}>
                  <span>{index.status}</span>
                </div>
              </Col>
              <Col xs={{ span: 6 }} md={{ span: 6 }}>
                <CurrencyRp price={index.idrPrice * index.quantity} />
              </Col>
            </Row>
            <Row>
                <Col>
                
                </Col>
            </Row>
      </React.Fragment>
    )
  })
}

export default ItemInvoiceCustomer
