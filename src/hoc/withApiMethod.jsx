import React, { Component } from "react";
import { fetchDataService } from "../api/services";
// getMethod, getMethodWithoutParam, fetchData, 
// import { compose } from "redux";
// import { connect } from "react-redux";

const withApiMethod = WrappedComponent => {
  class WithApiMethod extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        error: [],
        responseGet: [],
        responsePost: [],
        responseUpdate: [],
        responseDelete: []
      };
      this.method = {
        GET: "GET",
        POST: "POST",
        PATCH: "PATCH",
        DELETE: "DELETE"
      };
    }
  
    doGet = (url, payload) => {
      this.fetchData(url, this.method.GET, payload);
    };
  
    doPost = (url, payload) => {
      this.fetchData(url, this.method.POST, payload);
    };
  
    doUpdate = (url, payload) => {
      this.fetchData(url, this.method.PATCH, payload);
    };
  
    doDelete = (url, payload) => {
      this.fetchData(url, this.method.DELETE, payload);
    };
  
    responseMethod = (method, response) => {
        switch(method){
          case this.method.GET :
              return {responseGet : response.data, loading: false}
          case this.method.POST :
              return {responsePost : response.data, loading: false}
          case this.method.PATCH :
              return {responseUpdate : response.data, loading: false}
          case this.method.DELETE :
              return {responseDelete : response.data, loading: false}
          default :
        }
    }
  
    fetchData = async (url, method, payload) => {
      const request = {
        method: method,
        url: url,
        data: payload
      };
      this.setState({loading: true});
      try {
        const response = await fetchDataService(request);
        this.setState(this.responseMethod(method, response));
        console.log(this.responseMethod(method, response));
      } catch (error) {
        this.setState({
          error: error,
          loading: false
        });
      }
    };

    render() {
      const { data, responsePost, error } = this.state;
      return (
        <WrappedComponent
          data={data}
          error={error}
          responsePost={responsePost}
          doPost={this.doPost}
          doGet={this.doGet}
          {...this.props}
        />
      );
    }
  }
  return WithApiMethod;
};

export default withApiMethod;
