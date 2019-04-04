import React from "react";
import { Row, Col } from "antd";
import "./style.sass";
import { PATH_HOME } from "../../api/path";
import withGetMethodApi from "../../hoc/withGetMethodApi";

const Benefit = ({ data, error, loading }) => {
  console.log("benefit" + data);
  const showBenefit = data.map(benefit => (
      <Col style={{margin:"24px"}}>
        <div className="benefitBox">
          <img className="benefitImage" alt="" src={benefit.imageUrl} />
        </div>
      </Col>
  ));
  return <React.Fragment>{showBenefit}</React.Fragment>;
};

export default withGetMethodApi(PATH_HOME.HOME_BENEFIT)(Benefit);
