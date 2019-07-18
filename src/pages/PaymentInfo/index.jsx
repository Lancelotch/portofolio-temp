import React, { Component } from "react";
import "./style.sass";
import strings from "../../localization/localization";
import { Divider, Button, Modal, Row, Col, Collapse } from "antd";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import PaymentInstructions from "../../components/PaymentInstructions/index";
import PaymentInvoice from "../../components/PaymentInvoice/index";
import history from "../../routers/history";
import { apiGetWithToken } from "../../api/services";
import { PATH_ORDER } from "../../api/path";
import { Link } from "react-router-dom";
import SkeletonCustom from "../../components/Skeleton";

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
    this.setState({isLoading : true})
    const paymentId = this.props.match.params.paymentId;
    try {
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
      messageCopy: "Berhasil di Copy"
    });
    setTimeout(() => {
      this.setState({
        messageCopy: ""
      })
    }, 6000)
  };

  actionToDashboardCustomer = () => {
    return history.push("/dashboard-customer");
  }

  render() {
    const { gateway,isLoading } = this.state;
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
          <div className="top-header">
            <span>{strings.payment_info_sentence}</span>
          </div>
          <div className="content">
            <div className="logo">
              <Link to="/#">
                <img src={monggopesen_logo} alt="" />
              </Link>
            </div>
            <div className={isLoading === true ? "top-null":"info__style"}>
              <div className="info__title">
                <p>{strings.payment_info}</p>
                <Divider />
              </div>
              <div className="info__content">
                {isLoading === true ?
                  <Row type="flex" align="middle" style={{ marginTop: 40 }} className="info__bank">
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
                <div className="info__dropdownMethod">
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
                    <SkeletonCustom width={975} topMargin={10} height={48} color={"#BBBBBB"} count={0} />
                    :
                    <Button className="info__button" onClick={warning}>
                      <p>{strings.payment_check}</p>
                    </Button>
                  }
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
        }
      </div>
    );
  }
}

export default PaymentInfoPage;
