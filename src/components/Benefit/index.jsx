import React from "react";
import "./style.sass";
import { PATH_HOME } from "../../api/path";
import withGetMethodApi from "../../hoc/withGetMethodApi";
import SkeletonCustom from "../Skeleton";
import { Row, Col } from "antd";

const Benefit = ({ data, error, loading }) => {

  const showBenefit = data.map((benefit, index) => (
    <Col key={index} md={4}>
      <img
        className="mp-benefit-image"
        alt=""
        src={benefit.imageUrl} />
    </Col>
  ));


  return <React.Fragment>{data.length < 1 ?
    (<SkeletonCustom
      count={4}
      width={200}
      height={40}
      leftMargin={13}
      rightMargin={13}
      topMargin={24}
    />
    ) :
    (
      <div className="container">
        <div className="mp-benefit-box">
          {showBenefit}
        </div>
      </div>
    )}</React.Fragment>
};

export default withGetMethodApi(PATH_HOME.HOME_BENEFIT)(Benefit);
