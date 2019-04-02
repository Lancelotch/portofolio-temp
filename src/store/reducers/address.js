import TYPE from "../actions/type";

const initialState = {
  addressDefault: {},
  isAddressAvailable: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.GET_ADDRESS_DEFAULT:
      return {
        ...state,
        addressDefault: action.payload.addressDefault,
        isAddressAvailable: action.payload.isAddressAvailable
      };
    default:
      return state;
  }
};
