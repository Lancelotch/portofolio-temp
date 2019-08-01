import React, { Component } from "react";
import "./style.sass";
import { Avatar, Row, Col } from "antd";
import { connect } from "react-redux";

class ProfileMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      landscape: false,
      portrait: false
    };
  }

  componentDidMount() {
    this.getCustomer();
  }

  componentDidUpdate(prevProps) {
   if(this.props.customerPhoto !== prevProps.customerPhoto){
     this.getCustomer()
   } 
  }

  getCustomer = async () => {
    try {
      const isDimention = await this.checkDimension(this.props.customerPhoto);
      if (isDimention.height > isDimention.width) {
        this.setState({ portrait: true, landscape: false });
      } else if (isDimention.height < isDimention.width) {
        this.setState({ portrait: false, landscape: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  checkDimension = file => {
    return new Promise(resolve => {
      var image = new Image();
      image.src = file;
      image.onload = function() {
        let dimension = {};
        dimension.width = image.naturalWidth;
        dimension.height = image.naturalHeight;
        resolve(dimension);
      };
    });
  };

  render() {
    const { portrait, landscape } = this.state;
    return (
      <div>
        <Row style={{ padding: "46px 0 12px 0" }}>
          <Col
            md={6}
            className={portrait ? "portrait" : landscape ? "landscape" : ""}
          >
            <Avatar icon="user" size={40} src={this.props.customerPhoto} />
          </Col>
          <Col md={18} className="profile-main__customer-name" >
            <span>{this.props.customerName}</span>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  customerName: state.authentication.customerName,
  customerPhoto: state.authentication.customerPhoto
});

export default connect(mapStateToProps)(ProfileMain);
