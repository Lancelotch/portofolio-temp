import React from "react";
import {
  apiGetAddress,
  apiChangeAddressDefault
} from "../../api/services/ServiceAddress";
import { Col, Row, Button, Card, Modal } from "antd";

class ChangeAddressCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      addressIdDefault: this.props.addressIdDefault,
      openChangeAddressModal: false,
      visible : false
    };
  }

  componentWillMount() {
    apiGetAddress()
      .then(response => {
        const addresses = response.data;
        this.setState({
          addresses: addresses
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onCancel = () => {
    this.props.onCancel();
  }
 

  changeAddress = id => {
    const request = { addressId: id };
    apiChangeAddressDefault(request)
      .then(response => {
        this.setState({
          addressIdDefault: id
        });
        // eslint-disable-next-line no-unused-expressions
        this.props.changeAddress;
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { visible, onCancel, form } = this.props;
    return (
      <Modal
        visible={visible}
        closable={false}
        footer={null}
        onCancel={onCancel}
        width={600}
      >
        <div className="modal-header">
          <h4 className="typography-title">Pilih Alamat Pengiriman</h4>
        </div>
        <div className="modal-body">
          <Row>
            <Col md={12}>
              {this.state.addresses.map(address => {
                return (
                  <Card
                    className={
                      address.id !== this.state.addressIdDefault
                        ? "alamatDisebaled"
                        : "alamat-detail"
                    }
                    style={{
                      marginBottom: "8px"
                    }}
                    key={address.id}
                  >
                    <Row>
                      <Col md={8}>
                        <i className="far fa-user-circle CustomeridIcon">
                          <b
                            className="CustomeridIconText"
                            style={{ marginBottom: "24px" }}
                          >
                            {address.receiverName}
                          </b>
                        </i>
                        <p>{address.labelName + ", " + address.fullAddress}</p>
                      </Col>
                      <Col md={4}>
                        {address.id !== this.state.addressIdDefault ? (
                          <Button
                            navigationButton
                            style={{ marginTop: "16px" }}
                            onClick={this.changeAddress.bind(this, address.id)}
                          >
                            Pilih Alamat
                          </Button>
                        ) : (
                          <Button style={{ marginTop: "16px" }}>
                            Utamakan
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Card>
                );
              })}
            </Col>
            <Col md={6}>
      
              <Button
                onClick={this.onCancel.bind(this)}
              >
                Selesai
              </Button>
          
            </Col>
          </Row>
        </div>
      </Modal>
    );
  }
}

export default ChangeAddressCustomer;
