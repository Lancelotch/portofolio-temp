import React from 'react'
import { Row, Col } from 'antd'
import './style.sass'
import composedWithFetchData from '../../hoc/withFetchData';
import { PATH_HOME } from '../../api/path';

const Benefit = props => {
  const { data } = props
  //console.log('benefit' + benefit)
  const showBenefit = data.map(benefit => {
    return (
      <React.Fragment>
        <Col md={4}>
          <div className='benefitBox'>
            <img className='benefitImage' alt ="" src={benefit.imageUrl} />
          </div>
        </Col>
      </React.Fragment>
    )
  })

  return <React.Fragment>{showBenefit}</React.Fragment>
}

const BenefitWithData = composedWithFetchData(Benefit, PATH_HOME.HOME_BENEFIT)

export {Benefit, BenefitWithData}
