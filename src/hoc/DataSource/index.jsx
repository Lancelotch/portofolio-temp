import React from 'react';
import { apiGetWithoutToken } from '../../api/services';
import PropTypes from 'prop-types';

class DataSource extends React.Component { 
    state = { 
      data: void 0, 
      error: void 0,
      loading: false 
    } 
    componentDidMount() { 
      this.fetchData(); 
    } 
    componentDidUpdate(prevProps) { 
      if (this.props.url && this.props.url !== prevProps.url) {     
        this.fetchData(this.props.url); 
      } 
    } 
    async fetchData() { 
      try { 
        this.setState({ loading: true }); 
        const response = await apiGetWithoutToken(this.props.url);
        console.log(response)
        this.setState({ data: response }); 
        this.setState({ loading: false }); 
      }
      catch (err) { 
        this.setState({ error: err }) 
      } 
    } 
    render() {
      const { error, data, loading } = this.state; 
      if(loading) return <div>Loading...</div>;
      if(error) return this.props.error(error);
      if(data) return this.props.render(data); 
      else return null; 
    } 
  }

  DataSource.propType = {
      url: PropTypes.string
  }

  export default DataSource;