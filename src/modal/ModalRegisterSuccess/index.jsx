import React , {Component} from 'react'
import {Modal, Row, Col, Icon, Button} from 'antd'
import "./style.sass";
import {connect} from 'react-redux'
import {closeModal} from "../../store/actions/authentication"


class ModalRegister extends Component {


    render(){
        return(
            <Modal
                closable={false}
                width={593}
                bodyStyle={
                    {
                        height : "100%",
                    }
                }
                onCancel={this.props.closeModal}
                centered
                visible={this.props.modalStatus}
                footer={null}
            >
                <div className="confirmation">
                    <Row type="flex" justify="end">
                    <Col>
                            <Icon onClick={() => this.props.closeModal()} style={{fontSize: 24}} type="close-circle" />
                        </Col>
                    </Row>
                    <div>
                        <Row type="flex"  justify="center">
                            <Col>
                                <Icon style={{fontSize: 50, color: 'green'}} type="check-circle" />
                            </Col>
                        </Row>
                    </div>
                    <div className="confirmation__email"> 
                        <Row type="flex"  justify="center">
                            <Col>
                                <p>Hai, <span>{this.props.email}</span></p>
                            </Col>
                        </Row>
                    </div>
                    <div className="confirmation__text">
                        <Row type="flex"  justify="center">
                            <Col span={24}>
                                <p>Kami telah mengirimkan email konfirmasi ke email anda <br/> silahkan ikuti instruksi selanjutnya untuk mengkonfirmasi akun </p>
                            </Col>
                            <Col span={24}>
                                <Button onClick={() => this.props.closeModal()} className="color-button confirmation__text__button">
                                    <div className="color-button confirmation__text__inside">{this.props.textButton}</div>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                           
                </div>
                
            </Modal>
        )
    }

}


export default connect(null,{closeModal})(ModalRegister)
