import React, { Component } from "react";
import { Input } from "antd";
import "./style.sass"

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
      <div>
        <TextArea
          // onChange={e =>
          //   this.setState(
          //     { length: e.target.value.length },
          //     this.props.setFieldValue('notes',e.target.value)
          //   )
          // }
          onChange={ e => this.props.setStateNote(e)}
          name="notes"
          maxLength={255}
          placeholder="Contoh : warna, ukuran, dll."
          autosize={{minRows:4, maxRows:4}}
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
