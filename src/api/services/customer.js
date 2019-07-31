import {
     serviceWithToken
} from './httpClient';
import {
    PATH_CUSTOMER
} from '../path'
//const token = localStorage.getItem("accessToken");
const customerDetail = () => {
    return new Promise((resolve, reject) => {
        serviceWithToken()
            .request({
                method: 'GET',
                url: PATH_CUSTOMER.CUSTOMER,
                // headers: {
                //     Authorization: "Bearer " + token
                //   }
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error.response)
            })
    })
}

const customerEdit = request => {
    return serviceWithToken()
      .request({
        method: "PUT",
        url: PATH_CUSTOMER.CUSTOMER,
        data: request
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response;
      });
  };

const customer = {
    customerDetail: customerDetail,
    customerEdit: customerEdit
}

export default customer;