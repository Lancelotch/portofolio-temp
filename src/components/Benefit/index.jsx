import React from 'react'
import { Row, Col } from 'antd'
import './style.sass'

const Benefit = props => {
  const { benefit } = props
  const showBenefit = benefit.map(benefit => {
    return (
      <React.Fragment>
        <Col md={4}>
          <div className='benefitBox'>
            <img className='benefitImage' src={benefit.imageUrl} />
          </div>
        </Col>
      </React.Fragment>
    )
  })

  return <React.Fragment>{showBenefit}</React.Fragment>
}

export default Benefit
