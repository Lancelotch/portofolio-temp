import {
    // mainService
    // , dummyService
     serviceDummyWithToken
} from './httpClient';
import {
    PATH_CUSTOMER
} from '../path'
const token = localStorage.getItem("accessToken");
const customerDetail = () => {
    return new Promise((resolve, reject) => {
        serviceDummyWithToken()
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

const customer = {
    customerDetail: customerDetail
}

export default customer;