import React from "react";
import { apiGetWithoutToken, apiGetWithToken } from "../../services/api";
import PropTypes from "prop-types";

class DataSource extends React.Component {
  state = {
    data: void 0,
    error: void 0,
    loading: false
  };
  httpRequest = () => {
    return this.props.withAuth
      ? apiGetWithToken(this.props.url)
      : apiGetWithoutToken(this.props.url);
  };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.url && this.props.url !== prevProps.url) {
      this.fetchData(this.props.url);
    }
  }
  async fetchData() {
    console.log(this.props.url);
    try {
      this.setState({ loading: true });
      const response =  await this.httpRequest(this.props.url);
      console.log(response);
      this.setState({ data: response });
      this.setState({ loading: false });
    } catch (err) {
      console.log(err)
      this.setState({ error: err });
    }
  }
  render() {
    const { error, data, loading } = this.state;
    if (loading) return <div>Loading...</div>;
    if (error) return this.props.error(error);
    if (data) return this.props.render(data);
    else return null;
  }
}

DataSource.propTypes = {
  url: PropTypes.string,
  withAuth: PropTypes.bool
};

DataSource.defaultProps = {
  withAuth: false
};

export default DataSource;
