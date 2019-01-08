import React, { Component } from "react";
import Benefit from "./Benefit";

import assetIconRocket from "../../assets/img/IconRocket.png"
import assetIconSecurity from "../../assets/img/IconSecurity.png";
import assetIconWallet from "../../assets/img/IconWallet.png";
import { Row, Col } from "antd";

class Benefits extends Component {

  render() {
    return (
      <React.Fragment>
        <Row type="flex" justify="center">
          <Col xs = {{span: 24}} md = {{span: 4}} >
            <Benefit title="Global logistics" imageUrl={assetIconRocket} />
          </Col>
          <Col  xs = {{span: 24}} md = {{span: 5}} >
            <Benefit title="Payment Bank Transfer" imageUrl={assetIconWallet} />
          </Col>
          <Col  xs = {{span: 24}} md = {{span: 4}}>
            <Benefit title="Buyer Protection" imageUrl={assetIconSecurity} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Benefits;
