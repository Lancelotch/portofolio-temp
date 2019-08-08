import React, { Component } from "react";
import "./style.sass";
import { Row, Col, Button, Divider, Pagination } from "antd";
import Search from "antd/lib/input/Search";
import dummyQnA from "../../dummy/dummyQnA.json";
import logoBag from "../../assets/img/logo_monggopesen/ic_logo_bag_orange.png";

class ProductQnA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      minValue: 0,
      maxValue: 5
    };
  }


  getHighlightedText(text, higlight) {
    if (!higlight.trim()) {
      return <span>{text}</span>
    }
    let parts = text.split(new RegExp(`(${higlight})`, 'gi'));
    return <span> {parts.filter(part => part).map((part, i) =>
      <mark key={i} style={part.toLowerCase() === higlight.toLowerCase() ? { backgroundColor: "yellow" } : {}}>
        {part}
      </mark>)
    } </span>;
  }

  renderQnA = (qna, i) => {
    return (
      <Col key={i} md={24} style={{ marginTop: 20 }}>
        <Row>
          <Col md={1}>
            <img src={logoBag} style={{ maxHeight: 35 }} alt="" />
          </Col>
          <Col md={23}>
            <b>{this.getHighlightedText(qna.answerCustomer, this.state.search)}</b>
            <p style={{ color: "#417505" }}>{this.getHighlightedText(qna.questionAdmin, this.state.search)}</p>
          </Col>
        </Row>
      </Col>
    );
  };


  handleChangeQnA = value => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 5
      });
    } else {
      this.setState({
        minValue: this.state.maxValue,
        maxValue: value * 5
      });
    }
  };

  onChange = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { search } = this.state
    const lowercasedFilter = search.toLowerCase()
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
              Pertanyaan terkait Produk ({dummyQnA.length})
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
              placeholder="Cari pertanyaan terkait"
              onChange={this.onChange}
            />
          </Col>
        </Row>
        {filteredQnA.slice(this.state.minValue, this.state.maxValue)
          .map((val, i) => (this.renderQnA(val, i)))
        }
        <Pagination
          defaultCurrent={1}
          defaultPageSize={5}
          onChange={this.handleChangeQnA}
          total={dummyQnA.length}
        />
        <Divider />
      </div>
    );
  }
}

export default ProductQnA;
