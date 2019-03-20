import React, { Component } from "react";
import { getMethod, getMethodWithoutParam } from "../api/services";
import { compose } from "redux";
import { connect } from "react-redux";

const withFetchData = (WrappedComponent, method, pathService, request) => {
  class WithFetchData extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pathService: pathService,
        page : 0,
        limit : 20,
        direction: "desc",
        sortBy: "createdDate",
        data: []
      };
    }

    componentDidMount() {
      this.fetchData();
    }

    fetchData = async () => {
      const { page, limit,sortBy, direction, pathService } = this.state;
      const request = {
          page: page,
          limit: limit,
          sortBy: sortBy,
          direction: direction,
          pathService: pathService
      }
      try {
        const response = await getMethodWithoutParam(request);
        this.setState({
            data: response.data
        })
      } catch (error) {
        console.log(error);
      }
    };

    render() {
      const { data } = this.state;
      return <WrappedComponent data={data} />;
    }
  }
  return WithFetchData;
};

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
});

const composedWithFetchData = compose(
  connect(mapStateToProps),
  withFetchData
);

export default composedWithFetchData;
