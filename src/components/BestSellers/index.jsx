import React from 'react'
import { Col, Row } from 'antd'
import BestSeller from '../BestSeller'
import strings from "../../localization/localization";
import SkeletonCustom from '../Skeleton';

class BestSellers extends React.Component {
    // constructor(props){
    //     super(props)
    // }

    render() {
        const { data } = this.props
        // let counter = 0
        return (
            <React.Fragment>
                {data.length < 1 ? (
                    <div className="bestSellerBackground ">
                        <Row>
                            <Col md={4}>
                                <div className="best__box">
                                    <span className="best__fontOne">{strings.best}</span>
                                    <span className="best__fontTwo">{strings.seller}</span>
                                    <button className="best__button">{strings.see_more}</button>
                                </div>
                            </Col>
                            <Col md={20}>
                                <div style={{ paddingLeft: "120px" }}>
                                    <SkeletonCustom 
                                    count={3} 
                                    height={300} 
                                    width={200} 
                                    topMargin={70}
                                    rightMargin={70} 
                                    />
                                </div>
                            </Col>
                        </Row>/>
                </div>) : (
                        <React.Fragment>
                            <div className="bestSellerBackground ">
                                <Row>
                                    <Col md={4}>
                                        <div className="best__box">
                                            <span className="best__fontOne">{strings.best}</span>
                                            <span className="best__fontTwo">{strings.seller}</span>
                                            <button className="best__button">{strings.see_more}</button>
                                        </div>
                                    </Col>
                                    <Col md={20}>
                                        <div style={{ paddingLeft: "120px" }}>
                                            {data.map((product, i) => {
                                                return (
                                                    <Col md={4} style={{ marginTop: '70px', marginRight: '70px' }} key={i}>
                                                        <BestSeller
                                                            id={product.id}
                                                            key={i}
                                                            product={product}
                                                        />
                                                    </Col>
                                                )
                                            })}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </React.Fragment>)}

            </React.Fragment>);

    }
}

export default BestSellers