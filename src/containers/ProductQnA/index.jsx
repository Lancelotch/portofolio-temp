import React, { Component } from "react";
import "./style.sass";
import { Row, Col, Button, Divider, Icon } from "antd";
import Search from "antd/lib/input/Search";
import TextArea from "antd/lib/input/TextArea";

class ProductQnA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiveChat: false
    };
  }

  handleLiveChat = () => {
    this.setState({ isLiveChat: !this.state.isLiveChat });
  };

  render() {
    return (
      <div className="product-forum">
        {!this.state.isLiveChat ? (
          <Row className="title-inline">
            <Col md={13} style={{ paddingTop: "6px" }}>
              <span className="title-inline__title">
                Pertanyaan terkait Produk (32)
              </span>
            </Col>
            <Col md={3}>
              <Button
                type="link"
                className="title-inline__button-live-chat"
                onClick={this.handleLiveChat}
              >
                LIVE CHAT
              </Button>
            </Col>
            <Col md={8}>
              <Search
                onSearch={value => console.log(value)}
                placeholder="Cari pertanyaan terkait"
              />
            </Col>
          </Row>
        ) : (
          <div>
            <span className="title-inline__title">
              Ajukan pertanyaan kamu dibawah ini
            </span>
            <TextArea
              placeholder="Tulis pertanyaan kamu disini.."
              style={{ marginTop: 16 }}
            />
            <Row style={{ marginTop: 32 }}>
              <Col md={12}>
                <p>
                  Dalam mengajukan pertanyaan jangan sekali-kali mencantumkan
                  informasi rahasia anda, seperti alamat email pribadi atau
                  nomor rekening.
                </p>
              </Col>
              <Col md={12}>
                <Button type="default">
                  <Icon type="message" />
                  Live Chat
                </Button>
                <Button type="primary">Kirim Pertanyaan</Button>
              </Col>
            </Row>
            <Row className="title-inline" style={{ marginTop: 40 }}>
              <Col md={12} style={{ paddingTop: "6px" }}>
                <span className="title-inline__title">
                  Pertanyaan terkait Produk (32)
                </span>
              </Col>
              <Col md={12}>
                <Search
                  onSearch={value => console.log(value)}
                  placeholder="Cari pertanyaan terkait"
                />
              </Col>
            </Row>
          </div>
        )}
        <Divider />
      </div>
    );
  }
}

export default ProductQnA;
