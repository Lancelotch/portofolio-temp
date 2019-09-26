import React, { Component } from "react";
import "./style.sass";
import { Row, Col, Divider, Table, Avatar, message } from "antd";
import logoBag from "../../assets/img/logo_monggopesen/ic_logo_bag_orange.png";
import Search from "../../components/Search";
import QuestionAnswer from "../../repository/QuestionAnswer";
import Button from "../../components/Button";

const columns = [
  {
    title: "Question",
    dataIndex: "questionAndAnswer",
    key: "questionAndAnswer"
  }
];

class ProductQnA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      currentPage: 0
    };
  }

  getHighlightedText(text, higlight) {
    if (!higlight.trim()) {
      return <span>{text}</span>;
    }
    let parts = text.split(new RegExp(`(${higlight})`, "gi"));
    return (
      <span>
        {parts
          .filter(part => part)
          .map((part, i) => (
            <span
              key={i}
              style={
                part.toLowerCase() === higlight.toLowerCase()
                  ? { backgroundColor: "yellow" }
                  : {}
              }
            >
              {part}
            </span>
          ))}
      </span>
    );
  }

  renderQnA = qna => {
    const id = qna.id;
    const question =
      qna.question.charAt(0).toUpperCase() + qna.question.substr(1);
    const answer = qna.answer.charAt(0).toUpperCase() + qna.answer.substr(1);
    return {
      key: qna.id,
      questionAndAnswer: [
        <Row className="mp-qna" key={qna.id}>
          <Col md={1}>
            <Avatar src={logoBag} />
          </Col>
          <Col md={23}>
            <p className="mp-qna__question-text">
              {this.getHighlightedText(question, this.state.search)}
            </p>
            <p className="mp-qna__answer-text">
              {this.getHighlightedText(answer, this.state.search)}
            </p>
            <div className="mp-qna__ask-vote">
              <span>Apakah pertanyaan ini membantu?</span>
              <div className="mp-qna__button-box">
                <Button
                  type="ghost"
                  size="small"
                  customWidth="55"
                  onClick={() => this.handleClick({ id, option: "like" })}
                >
                  Ya
                </Button>
                <Button
                  type="ghost"
                  size="small"
                  customWidth="55"
                  onClick={() => this.handleClick({ id, option: "dislike" })}
                >
                  Tidak
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      ]
    };
  };

  handleClick = async res => {
    let option = "";
    if (res.option === "like") {
      option = "LIKE";
    }
    if (res.option === "dislike") {
      option = "DISLIKE";
    }
    const response = await QuestionAnswer.vote({
      questionAnswerId: res.id,
      option: option
    });
    if (response.status === 200) {
      message.open({
        content: "Terimakasih atas opini kamu, yu pesen di monggopesen.",
        duration: 2,
        icon: <Avatar src={logoBag} size={18} style={{ marginRight: 8 }} />
      });
    } else {
      message.error("Sepertinya ada masalah", 2);
    }
  };

  onChangeSearch = e => {
    this.setState({ search: e.target.value, currentPage: 0 });
  };

  onPageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { search } = this.state;
    const lowercasedFilter = search.toLowerCase();
    const filteredQnA = this.props.questionAnswers.filter(item => {
      console.log("filter2", item);
      return Object.keys(item).some(key =>
        item[key]
          .toString()
          .toLowerCase()
          .includes(lowercasedFilter)
      );
    });
    return (
      <div className="product-forum">
        <Row className="title-inline">
          <Col md={13}>
            <span className="title-inline__title">
              Pertanyaan terkait Produk ({this.props.questionAnswers.length})
            </span>
          </Col>
          <Col md={3}>
            <Button
              type="link"
              className="title-inline__button-live-chat"
              onClick={this.handleLiveChat}
            >
              Live Chat
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
            className: "pagination-product-forum"
          }}
          dataSource={filteredQnA.map(QnA => this.renderQnA(QnA))}
          columns={columns}
        />
      </div>
    );
  }
}

export default ProductQnA;
