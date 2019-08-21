import React, { Component } from "react";
import "./style.sass";
import strings from "../../localization/localization";
import { Divider, Modal, Row, Col, Collapse, notification } from "antd";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import PaymentInstructions from "../../components/PaymentInstructions/index";
import PaymentInvoice from "../../components/PaymentInvoice/index";
import history from "../../routers/history";
import { apiGetWithToken } from "../../api/services";
import { PATH_ORDER } from "../../api/path";
import { Link } from "react-router-dom";
import SkeletonCustom from "../../components/Skeleton";
import Button from "../../components/Button";


const openNotificationWithIcon = type => {
  notification[type]({
    message: strings.text_sucsess_copy,
    description:
      strings.text_invoice_infromasi_copy,
  });
};

class PaymentInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageCopy: "",
      copied: false,
      isLoading: false,
      gateway: {}
    };
  }


  componentDidMount() {
    this.getPaymentInfo();
  }


  getPaymentInfo = async () => {
    this.setState({ isLoading: true })
    try {
      const paymentId = this.props.match.params.paymentId;
      const response = await apiGetWithToken(PATH_ORDER.ORDER_PAYMENT_ID + paymentId)
      const payment = response.data.data;
      this.setState({
        isLoading: false,
        gateway: payment.gateway

      });
    } catch (error) {
      console.log(error);
      this.setState({
        isLoading: true
      })
    }
  };

  onCopy = () => {
    this.setState({
      copied: true,
    }, () => { openNotificationWithIcon('success') });
  };

  actionToDashboardCustomer = () => {
    return history.push("/dashboard-customer/my-order");
  }

  render() {
    const { gateway, isLoading } = this.state;
    const warning = () => {
      Modal.warning({
        className: "modal-check-status",
        title: strings.payment_modal_ask,
        content: strings.payment_modal_content,
        onOk: this.actionToDashboardCustomer
      });
    };

    return (
      <div className="container">
        <React.Fragment>
          <div className="mp-info-payment__top-header">
            <span>{strings.payment_info_sentence}</span>
          </div>
          <div className="mp-info-payment__content">
            <div className="mp-info-payment__logo">
              <Link to="/#">
                <img src={monggopesen_logo} alt="" />
              </Link>
            </div>
            <div className={isLoading === true ? "mp-info-payment__top-null" : "mp-info-payment__style"}>
              <div className="mp-info-payment__title">
                <p>{strings.payment_info}</p>
                <Divider />
              </div>
              <div className="mp-info-payment___content">
                {isLoading === true ?
                  <Row type="flex" align="middle" style={{ marginTop: 40 }} className="mp-info-payment__info-bank">
                    <Col md={4} />
                    <Col md={16} />
                    <Col md={4} style={{ textAlign: "end" }}>
                      <SkeletonCustom height={48} count={0} color={"#BBBBBB"} width={81} />
                    </Col>
                  </Row>
                  :
                  <PaymentInvoice
                    gateway={gateway}
                    onCopy={this.onCopy}
                  />}
                <center style={{ color: "red" }}>{this.state.messageCopy}</center>
                <div className="mp-info-payment__drop-down">
                  {isLoading === true ?
                    <Collapse defaultActiveKey={["1"]} accordion>
                      <Collapse.Panel showArrow={false} className="collapse_null" key="1" />
                    </Collapse>
                    :
                    <PaymentInstructions paymentInstruction={this.state.gateway.bank && this.state.gateway.bank} />
                  }
                </div>
                <div>
                  {isLoading === true ?
                    <SkeletonCustom 
                    leftMargin={13}
                    width={975} 
                    topMargin={10} 
                    height={48} 
                    color={"#BBBBBB"} 
                    count={0} />
                    :
                    <Button type="primary" width="full" size="large" onClick={warning}>
                      {strings.payment_check}
                    </Button>
                  }
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default PaymentInfoPage;
