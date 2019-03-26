import React, { Component } from "react";
import { getMethod, getMethodWithoutParam, fetchData } from "../api/services";

const withGetMethodApi = (path)=>(WrappedComponent) => {
  class WithGetMethodApi extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        loading: false,
        error: [],
      };
    }
    componentDidMount(){
      this.fetchData(path);
    }

    fetchData = async (path) => {
      this.setState({
          loading: true
      })
      try {
        const response = await getMethod(path);
        this.setState({
          data: response.data,
          loading: false
        });
      } catch (error) {
        this.setState({
          error: error,
          loading: false
        });
      }
    };

    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
        />
      );
    }
  }
  return WithGetMethodApi;
};

export default withGetMethodApi;
