import React, { Component,cloneElement } from "react";
import { getMethod, fetchData } from "../../api/services";

class Fetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      error: []
    };
  }
  componentDidMount() {
    this.fetchData(this.props.path);
  }

  fetchData = async path => {
    this.setState({
      loading: true
    });
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
    return cloneElement(this.props.children,this.state);
  }
}

export default Fetcher;
