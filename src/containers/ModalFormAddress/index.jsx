import React from "react";
import { Modal } from "antd";
import EditAddress from "../EditAddress";
import CreateAddress from "../CreateAddress";
import PropTypes from "prop-types";

export default function ModalFormAddress(props) {
  return (
    <Modal visible={props.visible} onCancel={props.onCancel} footer={null}>
      {props.action === "create" ? (
        <CreateAddress onCancel={props.onCancel} />
      ) : (
        <EditAddress onCancel={props.onCancel} id={props.addressId} />
      )}
    </Modal>
  );
}

ModalFormAddress.propTypes = {
  visible: PropTypes.bool,
  action: PropTypes.string,
  onCancel: PropTypes.func
};

ModalFormAddress.defaultProps = {
  visible: false,
  action: "create"
};
