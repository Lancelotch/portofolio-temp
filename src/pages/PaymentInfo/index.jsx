import React, { Component } from "react";
import "./style.sass";
import strings from "../../localization/localization";
import { Divider, Collapse, Button, Row, Col } from "antd";

class PaymentInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="info__style">
        <div className="info__title">
          <p>{strings.payment_info}</p>
          <Divider />
        </div>
        <div className="info__content">
          <div className="info__payment">
            <p style={{ color: "#9B9B9B" }}>{strings.payment_total_amount}</p>
            <p style={{ color: "#004853", fontSize: "36px" }}>Rp. 1.500.000</p>
            <br />
            <p style={{ color: "#9B9B9B" }}>{strings.payment_pay_before}</p>
            <p style={{ color: "#4A4A4A", fontSize: "24px" }}>
              February 29 - 13.20 WIB
            </p>
          </div>
            <Row
              type="flex"
              justify="center"
              align="middle"
              className="info__bank"
            >
              <Col md={4}>
                <text style={{color:"#9B9B9B"}}>{strings.virtual_account}</text>
              </Col>
              <Col md={16} style={{ textAlign: "center" }}>
                <text className="virtualNumber">ABCD123454321</text>
              </Col>
              <Col md={4} style={{ textAlign: "end" }}>
                <Button className="info__bankButton">
                  <p>Salin</p>
                </Button>
              </Col>
            </Row>
          <div className="info__dropdownMethod">
            <Collapse defaultActiveKey={["1"]} accordion>
              <Collapse.Panel header="Cara Bayar" key="1">
                <ol>
                  <li>
                    Pilih pembayaran melalui Bank Transfer/Virtual Account.
                  </li>
                  <li>
                    Catat 16 digit nomor virtual account & nominal pembayaran
                    anda.
                  </li>
                  <li>
                    Gunakan ATM yang memiliki jaringan ATM Bersama/Prima/Alto
                    untuk menyelesaikan pembayaran.
                  </li>
                  <li>Masukkan PIN anda.</li>
                  <li>
                    Di menu utama pilih <b>'Transaksi lainnya'.</b>
                  </li>
                  <li>
                    Pilih 'Transfer' lalu pilih <b>'Ke Rek ke Bank Lain'.</b>
                  </li>
                  <li>
                    Masukkan kode bank BNI <b>'009'</b> lalu pilih 'Benar'.
                  </li>
                  <li>Masukkan nominal pembayaran lalu pilih 'Benar'.</li>
                  <li>
                    Masukkan 16 digit virtual account tujuan pembayaran lalu
                    pilih 'Benar'.
                  </li>
                  <li>Pilih Rekening yang akan didebet.</li>
                  <li>
                    Pastikan nominal pembayaran & nomor virtual account sudah
                    benar terisi, lalu pilih 'Benar'.
                  </li>
                  <li>Pembayaran Anda dengan BNI Virtual Account selesai.</li>
                </ol>
              </Collapse.Panel>
            </Collapse>
          </div>
          <div>
            <Button className="info__button">
              <p>Cek Status Pembayaran</p>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentInfoPage;
