import React, { Component } from "react";
import { getMethod} from "../api/services";
// , getMethodWithoutParam, fetchDataService 

const withGetMethodApi = (path) => (WrappedComponent) => {
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
      this.mounted = true
      this.fetchData(path);
    }

    componentWillUnmount(){
      // this.fetchData(path)
      this.mounted = false
    }

    fetchData = async (path) => {
      this.setState({
          loading: true
      })
      try {
        const response = await getMethod(path);
        if(this.mounted){
          this.setState({
            data: response.data,
            loading: false
          });
        }
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
