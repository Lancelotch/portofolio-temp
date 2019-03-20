import React, { Component } from 'react';
import { Alert } from 'antd';

class RegistrationaAlert extends Component {
    render() {
      return this.props.message && (
        <Alert
          type={this.props.success ? "success" : "error"}
          message={
            <span>
              <b>{this.props.success ? "Berhasil" : "Gagal"}</b> &nbsp;
              {this.props.message}
            </span>
          }
          showIcon
        />
      )
    }
  }
  
  export default RegistrationaAlert;