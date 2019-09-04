import React, { useState } from "react";
import ModalFormAddress from "../../containers/ModalFormAddress";

export default function Development() {
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [action, setAction] = useState("create");
  function handleCreate(){
      setAction("create");
      setVisibleCreate(true);
  }
  function handleUpdate(){
    setAction("update");
    setVisibleUpdate(true);
  }
  return (
    <React.Fragment>
      <button onClick={() => handleCreate()}>Create Address</button>
      <button onClick={() => handleUpdate()}>Edit Address</button>
      <ModalFormAddress action={action} visible={visibleCreate} onCancel={()=>setVisibleCreate(false)} onSuccess={()=>setVisibleCreate(false)}/>
      <ModalFormAddress action={action} visible={visibleUpdate} onCancel={()=>setVisibleUpdate(false)} onSuccess={()=>setVisibleUpdate(false)} id="8524ac9f-ec39-4e3b-8338-08d8cfd1543a"/>
    </React.Fragment>
  );
}
