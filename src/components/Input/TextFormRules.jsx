import React, { Component } from "react";
import { Input, Form, Icon } from "antd";
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class TextFormRules extends Component {
  onChangeValue = (event) => {
    const value = event.target.value;
    this.props.onChange(value);
  }

  render() {
    const {item, icon, placeholder, message } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <FormItem>
          {getFieldDecorator(item, {
            rules: [{ required: true, message: message }]
          })(
            <Input
              prefix={<Icon type={icon} style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder={placeholder}
              onChange={this.onChangeValue}
            />
          )}
        </FormItem>
      </div>
    );
  }
}

TextFormRules.propTypes = {
    item : PropTypes.string,
    icon : PropTypes.string,
    placeholder : PropTypes.string,
    message : PropTypes.string,
    type : PropTypes.string
}

const InputTextFormRules = Form.create({})(TextFormRules);

export default InputTextFormRules;
