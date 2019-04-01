import React, { Component } from "react";
import { Input } from "antd";

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
      <div style={{ padding: 10 }}>
        <TextArea
          onChange={e => this.setState({ length: e.target.value.length })}
          maxLength={255}
          rows={4}
        />
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.5,
            opacity: 0.5,
            float: "right"
          }}
        >
          {this.state.length}/255
        </p>
      </div>
    );
  }
}

export default NotedLimit;
