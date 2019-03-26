import React, { Component } from "react";
import { getMethod, getMethodWithoutParam, fetchData } from "../api/services";
import { compose } from "redux";
import { connect } from "react-redux";

const withApiMethod = WrappedComponent => {
  class WithApiMethod extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        response: [],
        loading: false,
        error: false
      };
      this.method = {
        GET: "GET",
        POST: "POST",
        PATCH: "PATCH",
        DELETE: "DELETE"
      };
    }
    
    doGet = (url, payload) => {
      console.log(url);
      this.fetchData(url, this.method.GET, payload);
    };

    doPost = (url, payload) => {
      console.log(payload);
      this.fetchData(url, this.method.POST, payload);
    };

    doUpdate = (url, payload) => {
      this.fetchData(url, this.method.PATCH, payload);
    };

    doDelete = (url, payload) => {
      this.fetchData(url, this.method.DELETE, payload);
    };

    fetchData = async (url, method, payload) => {
      const request = {
        method: method,
        url: url,
        data: payload
      };
      try {
        const response = await fetchData(request);
        this.setState({
          response: response,
          data: response.data
        });
      } catch (error) {
        console.log(error);
        this.setState({
          error: true
        });
      }
    };

    render() {
      const { data, response, error } = this.state;
      return (
        <WrappedComponent
          data={data}
          error={error}
          response={response}
          doPost={this.doPost}
          doGet={this.doGet}
          {...this.props}
        />
      );
    }
  }
  return WithApiMethod;
};

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
});

const composedWithApiMethod = compose(
  connect(mapStateToProps),
  withApiMethod
);

export default composedWithApiMethod;
