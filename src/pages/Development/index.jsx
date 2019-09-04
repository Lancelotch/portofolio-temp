import React, { useState } from "react";
import ModalFormAddress from "../../containers/ModalFormAddress";

export default function Development() {
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState("create");
  function handleCreate(){
      setAction("create");
      setVisible(true);
  }
  function handleEdit(){
    setAction("update");
    setVisible(true);
}
  return (
    <React.Fragment>
      <button onClick={handleCreate}>Create Address</button>
      <button onClick={handleEdit}>Edit Address</button>
      <ModalFormAddress action={action} visible={visible} onCancel={()=>setVisible(false)} addressId="2c80df93-4b82-4d4b-8f54-94a67b0abdb1"/>
    </React.Fragment>
  );
}
