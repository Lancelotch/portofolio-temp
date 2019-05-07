import React , {Component} from 'react'
import {Modal, Row, Col, Icon, Layout} from 'antd'
import history from "../../routers/history"
import "./style.sass";


class ModalRegister extends Component {
    constructor(props){
        super(props)
    }
    closeRedirect = () =>{
        history.push("/")
    }   
    render(){
        const {Header , Content, Footer} = Layout

        return(
            <Modal
                closable={false}
                width={593}
                bodyStyle={
                    {
                        height : "100%",
                        // padding: 100
                    }
                }
                centered
                visible={this.props.modalStatus}
                footer={null}
            >
                <div className="confirmation">
                    <Row type="flex" justify="end">
                    <Col>
                            <Icon onClick={() => this.closeRedirect()} style={{fontSize: 24}} type="close-circle" />
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
                            <Col>
                                <p>Kami telah mengirimkan email konfirmasi ke email anda <br/> silahkan ikuti instruksi selanjutnya untuk mengkonfirmasi akun </p>
                            </Col>
                        </Row>
                    </div>
                           
                </div>
                
            </Modal>
        )
    }

}


export default ModalRegister
