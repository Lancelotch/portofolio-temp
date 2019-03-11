import React from 'react'
import {Col } from 'antd'


const Shippings = props => {
  const { shipping } = props
  const showShipping = shipping.map((shippings)=> {
    return (
      <React.Fragment>
        <Col md={24}>
          <div className='shipping'>
          <Col md={24}>
            <p>{shippings.via}</p>
            </Col>
            <Col md={24}>
           <p>{shippings.estimation}</p> 
            {shippings.price}
            </Col>
          </div>
        </Col>
      </React.Fragment>
    )
  })

  return <React.Fragment>{showShipping}</React.Fragment>
}

export default Shippings
