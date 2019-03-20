import React, { Component } from 'react';
import { Input } from "antd";

class RegistrationInput extends Component {
  render() {
    return this.props.fieldDecorator(
          <Input
            className='register__input'
            min={this.props.min}
            max={this.props.max}
            size={this.props.size}
            prefix={this.props.prefix}
            placeholder={this.props.placeholder}
            type={this.props.type || 'text'}
          />
        );
  }
}

export default RegistrationInput;