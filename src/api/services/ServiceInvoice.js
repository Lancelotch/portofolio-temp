import urls from "../urls";
import httpClient  from "config/httpClient";

const apiGetInvoice = () => {    
  return new Promise((resolve, reject) => {
    httpClient.mainService
      .request({
        method: "GET",
        url: urls.GetInvoice,
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const apiGetInvoiceById = (request) => {    
  return new Promise((resolve, reject) => {
    httpClient.mainService
      .request({
        method: "GET",
        url: urls.GetInvoice+request,
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};


const serviceInvoice = {
  apiGetInvoice : apiGetInvoice,
  apiGetInvoiceById : apiGetInvoiceById
}

export default serviceInvoice