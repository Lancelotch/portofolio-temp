import React, { Component, PropTypes } from "react";
import { Input } from 'antd';

const { TextArea } = Input;

class NotedLimit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 0
    };
  }
  render() {
    return (
      <div style={{ padding: "20px" }}>
        <TextArea
          onChange={e => this.setState({ length: e.target.value.length })}
          maxLength={255}
          style={{ width: "400px" }}
          rows={4}
        />
        <div style={{ fontSize: "18px", lineHeight: 1.5 }}>
          {this.state.length}/255
        </div>
      </div>
    );
  }
}

export default NotedLimit;
