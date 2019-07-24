import { getAddressDefault } from "../../api/services/address";
import dispatchType from "./dispatchType";

export const addressDefault = () => async dispatch => {
  try {
    const response = await getAddressDefault();
    let payload = null;
    if (response.code === 200 || response.code === "200") {
      payload = { isAddressAvailable: true, addressDefault: response.data }
    } else {
      payload = { isAddressAvailable: false, addressDefault: response.data }
    }
    dispatch(dispatchType.getAddressDefault(payload));
  } catch (error) {
    console.log(error);
  }
};
