import React,{useState, useEffect} from "react";
import { Modal, Radio } from "antd";
import AddressListDetail from '../../components/AddressListDetail';
import Button from "../../components/Button";

const RadioGroup = Radio.Group;

export default  function AddressList(props){
  const [customerAddress, setCustomerAddress] = useState(props.customerAddress);
  
  function onChange(e){
    setCustomerAddress(getAddress(e.target.value));
  }
  
  useEffect(()=>{
    setCustomerAddress(props.customerAddress)
  },[props.addresses])

  function getAddress(id){
    return props.addresses.find(address => id === address.id);
  }

  function handleOk(){
    props.onChangeAddress(customerAddress);
  }

  function address(addresses){
    return addresses.map(address => (
      <AddressListDetail
        key={address.id}
        address={address}
      />
    ));
  };
    return (
      <Modal
        title="Pilih alamat pengiriman"
        visible={props.visible}
        onOk={handleOk}
        onCancel={props.onCancle}
        footer={[
          <Button
          key="cancel"
            size="large"
            onClick={props.onCancle}>
            <div className="">Batal</div>
          </Button>,
          <Button
          key="use address"
            size="large"
            type="primary"
            onClick={handleOk}
          >
            <div className="button-simpan__choose-address">Gunakan Alamat</div>
          </Button>
        ]}
      >
        <RadioGroup style={{ width: '100%' }} onChange={onChange} value={customerAddress.id}>
          {address(props.addresses)}
        </RadioGroup>
      </Modal>
    );
  }


