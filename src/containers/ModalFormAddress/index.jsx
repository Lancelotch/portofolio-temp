import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";
import FormAddress from "../FormAddress";

export default function ModalFormAddress(props) {
  return (
    <Modal visible={props.visible} onCancel={props.onCancel} footer={null}>
      <FormAddress
        action={props.action}
        onCancel={props.onCancel}
        id={props.id}
      />
    </Modal>
  );
}

ModalFormAddress.propTypes = {
  visible: PropTypes.bool,
  action: PropTypes.string,
  onCancel: PropTypes.func,
  id: PropTypes.string
};

ModalFormAddress.defaultProps = {
  visible: false,
  action: "create"
};
