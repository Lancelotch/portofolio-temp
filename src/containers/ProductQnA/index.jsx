import React, { Component } from "react";
import "./style.sass";
import { Row, Col, Button, Divider, Table } from "antd";
import Search from "antd/lib/input/Search";
import dummyQnA from "../../dummy/dummyQnA.json";
import logoBag from "../../assets/img/logo_monggopesen/ic_logo_bag_orange.png";

const columns = [{
  title: 'Question',
  dataIndex: 'questionAndAnswer',
  key: 'questionAndAnswer'
}
];

class ProductQnA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      currentPage: 0
    }
  }

  getHighlightedText(text, higlight) {
    if (!higlight.trim()) {
      return <span>{text}</span>
    }
    let parts = text.split(new RegExp(`(${higlight})`, 'gi'));
    return <span>
      {parts.filter(part => part).map((part, i) =>
        <span key={i} style={part.toLowerCase() === higlight.toLowerCase() ? { backgroundColor: "yellow" } : {}}>
          {part}
        </span>)
      }
    </span>
  };

  renderQnA = (qna, i) => {
    return ({
      key: i,
      questionAndAnswer: [
        <Col key={i} md={24} style={{ marginTop: 20 }}>
          <Row>
            <Col md={1}>
              <img src={logoBag} style={{ maxHeight: 35 }} alt="" />
            </Col>
            <Col md={23} style={{ marginTop: 10 }}>
              <b style={{ fontWeight: 555 }}> {this.getHighlightedText(qna.questionAdmin, this.state.search)}</b>
              <p style={{ color: "#417505" }}> {this.getHighlightedText(qna.answerCustomer, this.state.search)}</p>
              <span>Apakah pertanyaan ini membantu?
                <Button style={{ margin: "0px 10px 0 10px" }} className="mp-button-qna">Ya</Button>
                <Button style={{ margin: "0px 10px 0 10px" }} className="mp-button-qna">Tidak</Button>
              </span>
            </Col>
          </Row>
        </Col>
      ]
    })
  };

  onChangeSearch = e => {
    this.setState({ search: e.target.value, currentPage: 0 });
  };

  onPageChange = page => {
    this.setState({ currentPage: page })
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
          <Col md={13}>
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
              onChange={this.onChangeSearch}
            />
          </Col>
        </Row>
        <Divider />
        <Table
          className="table-qna"
          showHeader={false}
          pagination={{
            defaultPageSize: 5,
            current: this.state.currentPage,
            onChange: this.onPageChange,
            className: 'pagination-product-forum'
          }}
          dataSource={
            filteredQnA.map((QnA, i) => (this.renderQnA(QnA, i)))}
          columns={columns} />
      </div>
    );
  }
}

export default ProductQnA;
