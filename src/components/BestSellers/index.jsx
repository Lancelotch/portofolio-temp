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
        const { data, /*maxProductCount*/ } = this.props
        // console.log("best", data);

        //let counter = 0
        return (
            <React.Fragment>
                {data.length < 1 ? (
                    <div className="bestSellerBackground ">
                        <Row>
                            <Col md={4}>
                                <div className="best__box">
                                    <span className="best__fontOne">{strings.best}</span>
                                    <span className="best__fontTwo">{strings.seller}</span>
                                    { /*<button className="best__button">{strings.see_more}</button>*/}
                                </div>
                            </Col>
                            <Col md={20}>
                                <div style={{ paddingLeft: "120px" }}>
                                    <SkeletonCustom
                                        count={3}
                                        height={300}
                                        width={200}
                                        topMargin={64}
                                        rightMargin={70}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>) : (
                    <div className="bestSellerBackground ">
                            <Row>
                                <Col md={4}>
                                    <div className="best__box">
                                        <span className="best__fontOne">{strings.best}</span>
                                        <span className="best__fontTwo">{strings.seller}</span>
                                        {/*<button className="best__button">{strings.see_more}</button>*/}
                                    </div>
                                </Col>
                                <Col md={20}>
                                    <div style={{
                                        display: "flex",
                                        overflow: "hidden",
                                        margin: "52px 0 0 70px"
                                    }}
                                    >
                                        {data.map((product, i) => {
                                            // if (maxProductCount && counter < maxProductCount) {
                                            //     if (maxProductCount !== null) {
                                            //         counter += 1;
                                            //     }
                                                return (
                                                    <BestSeller id={product.id} key={i} product={product} />
                                                )
                                            // }
                                            // if (!maxProductCount) {
                                            //     return (<BestSeller id={product.id} key={i} product={product} />)
                                            // }
                                        })}
                                    </div>
                                </Col>
                            </Row>
                    </div>)}
            </React.Fragment>);

    }
}

export default BestSellers