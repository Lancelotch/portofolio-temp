import React from "react";
import {  Col } from "antd";
import "./style.sass";
import { PATH_HOME } from "../../api/path";
import withGetMethodApi from "../../hoc/withGetMethodApi";
import SkeletonCustom from "../Skeleton";

const Benefit = ({ data, error, loading }) => {
  const showBenefit = data.map((benefit,index) => (
      <Col style={{margin:"24px"}} key={index}>
        <div className="benefitBox">
          <img className="benefitImage" alt="" src={benefit.imageUrl} />
        </div>
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
  (showBenefit)}</React.Fragment>
};

export default withGetMethodApi(PATH_HOME.HOME_BENEFIT)(Benefit);
