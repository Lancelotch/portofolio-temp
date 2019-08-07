import React, { Component } from "react";
import "./style.sass";
import { Row, Col, Button, Divider } from "antd";
import Search from "antd/lib/input/Search";
import dummyQnA from "../../dummy/dummyQnA.json";
import Highlighter from "react-highlight-words";

class ProductQnA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  renderQnA = qna => {
    return (
      <Col  md={24} style={{ marginTop: "20px" }}>
        <Highlighter
          searchWords={[this.state.search]}
          textToHighlight={qna.answerCustomer}
        />
        <p>
          <Highlighter
            searchWords={[this.state.search]}
            textToHighlight={qna.questionAdmin}
          />
        </p>
      </Col>
    );
  };

  onChange = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { search } = this.state
    const lowercasedFilter = search.toLowerCase();
    const filteredQnA = dummyQnA.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toLowerCase().includes(lowercasedFilter)
      );
    })
    return (
      <div className="product-forum">
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
              value={this.state.search}
              onSearch={value => console.log(value)}
              placeholder="Cari pertanyaan terkait"
              onChange={this.onChange}
            />
          </Col>
        </Row>
        <Row>
          {filteredQnA.forEach(qna => {
             this.renderQnA(qna);
          })}
        </Row>
        <Divider />
      </div>
    );
  }
}

export default ProductQnA;
