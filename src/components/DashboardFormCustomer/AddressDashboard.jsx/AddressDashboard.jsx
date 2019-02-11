import React, { Component } from "react";
import { message, Row, Col, Card, Button, Icon } from "antd";
import {
  apiGetAddress,
  apiChangeAddressDefault,
  apiDeleteAddress
} from "../../../api/services/ServiceAddress";
import AddAdressCustomer from "../AddAdressCustomer/AddAdressCustomer";
import homeDashboard from "../../../assets/img/home_dashboard.png";

class AddressDashboard extends Component {
  constructor() {
    super();
    this.state = {
      addresses: [],
      editId: null,
      modalAddAdress: false
    };
  }

  componentDidMount() {
    this.loadAddresses();
  }

  loadAddresses() {
    apiGetAddress()
      .then(response => {
        const addresses = response.data;
        this.setState({
          addresses: addresses
        });
        console.log(addresses);
      })
      .catch(error => {
        console.log(error);
      });
  }

  changeDefaultAddress(id) {
    const request = { addressId: id };
    apiChangeAddressDefault(request)
      .then(response => {
        this.loadAddresses();
        this.success();
      })
      .catch(error => {
        console.log(error);
      });
  }

  success = () => {
    message.success("Alamat anda telah dirubah");
  };

  deleteAddress(id) {
    apiDeleteAddress(id).then(res => {
      this.loadAddresses();
    });
  }

  modalAddAdress = () => {
    this.setState({
      modalAddAdress: !this.state.modalAddAdress
    });
  };

  render() {
    const { addresses } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col xs={{ span: 8 }} md={{ span: 8 }}>
            <Card
              style={{ width: "50%" }}
              cover={<img style={{ width: "100%" }} src={homeDashboard} />}
            />
            <React.Fragment>
              <button
                className="button-navigation"
                onClick={this.modalAddAdress}
              >
                Tambah Alamat
              </button>
              <AddAdressCustomer
                visible={this.state.modalAddAdress}
                onCancel={this.modalAddAdress}
              />
            </React.Fragment>
          </Col>

          {addresses.map(address => {
            return (
              <Col
                xs={{ span: 16 }}
                md={{ span: 16 }}
                style={{ marginBottom: "10px" }}
              >
                <Card>
                  <Row>
                    <Col xs={{ span: 24 }} md={{ span: 24 }}>
                      <React.Fragment>
                        <Icon type="user" />
                        <span>{address.receiverName}</span>
                      </React.Fragment>
                      <p>{`${address.labelName}, ${address.fullAddress}`}</p>
                      <p>{`Phone Number : ${address.phoneNumber}`}</p>
                      <Row>
                        <Col xs={{ span: 6 }} md={{ span: 6 }}>
                          {!address.isDefault ? (
                            <Button
                              type="danger"
                              onClick={this.changeDefaultAddress.bind(
                                this,
                                address.id
                              )}
                            >
                              Pilih Alamat
                            </Button>
                          ) : (
                            <React.Fragment>
                              {" "}
                              <Button disabled>utamakan</Button>
                            </React.Fragment>
                          )}
                        </Col>
                        <Col>
                          <Button
                            style={{ marginRight: "5px", padding: "0px 10px " }}
                            onClick={this.deleteAddress.bind(this, address.id)}
                          >
                            hapus
                          </Button>
                          <Button>edit</Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })}
        </Row>
      </React.Fragment>
    );
  }
}

export default AddressDashboard;
