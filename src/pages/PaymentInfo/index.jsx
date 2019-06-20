import React, { Component } from "react";
import "./style.sass";
import strings from "../../localization/localization";
import { Divider, Button, Modal, Row, Col,  Collapse } from "antd";
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
      paymentInstruction: {},
      payment: null,
      endDatePayment: null,
      bank: {},
      copied: false,
      isLoading: true
    };
  }


  componentDidMount() {
    this.getPaymentInfo();
  }


  getPaymentInfo = async () => {
    const paymentId = this.props.match.params.paymentId;
    try {
      const response = await apiGetWithToken(PATH_ORDER.ORDER_PAYMENT_ID + paymentId)
      const payment = response.data.data;
      this.setState({
        isLoading: false,
        paymentInstruction: payment.paymentInstruction,
        endDatePayment: payment.endDatePayment,
        payment: payment.payment,
        bank: payment.bank

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
      // copied: true,
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
    const { payment, endDatePayment, bank } = this.state;
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
            <div className="info__style">
              <div className="info__title">
                <p>{strings.payment_info}</p>
                <Divider />
              </div>
              <div className="info__content">
                {payment === null ?
                  <Row type="flex" align="middle" style={{ marginTop: 40 }} className="info__bank">
                    <Col md={4} />
                    <Col md={16} />
                    <Col md={4} style={{ textAlign: "end" }}>
                      <SkeletonCustom height={48} count={0} color={"#BBBBBB"} width={81} />
                    </Col>
                  </Row>
                  :
                  payment &&
                  <PaymentInvoice
                    payment={payment}
                    endDatePay={endDatePayment}
                    bank={bank}
                    onCopy={this.onCopy}
                  />

                }
                <center style={{ color: "red" }}>{this.state.messageCopy}</center>
                <div className="info__dropdownMethod">
                  {payment === null ?
                    <React.Fragment>
                      <Collapse defaultActiveKey={["1"]} accordion>
                        <Collapse.Panel showArrow={false} className="collapse_null" key="1"/>
                      </Collapse>
                    </React.Fragment>
                    :
                    <PaymentInstructions paymentInstruction={this.state.paymentInstruction} />
                  }
                </div>
                <div>
                  {payment === null ?
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
