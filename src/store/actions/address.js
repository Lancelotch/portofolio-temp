import {getAddressDefault} from "../../api/services/address";
import dispatchType from "./dispatchType";

export const addressDefault = () => async dispatch => {
  try {
    const response = await getAddressDefault();
    const lengthObject = Object.keys(response.data).length;
    let payload=null;
    if(lengthObject > 0){
        payload = {isAddressAvailable: true, addressDefault: response.data} 
    }else{
        payload = {isAddressAvailable: false, addressDefault: response.data} 
    }  
    dispatch(dispatchType.getAddressDefault(payload));
  } catch (error) {
    console.log(error);
  }
};
