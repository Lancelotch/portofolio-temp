import React, { Component, cloneElement } from "react";
import { fetchDataService } from "../api/services";
import { connect } from "react-redux";

class FetcherAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: [],
      responseGet: [],
      responsePost: [],
      responseUpdate: [],
      responseDelete: [],
      doGet: this.doGet,
      doPost: this.doPost,
      doDelete: this.doDelete,
      doUpdate: this.doUpdate
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
    return cloneElement(this.props.children, this.state);
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps)(FetcherAction);
