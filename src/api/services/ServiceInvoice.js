import urls from "../urls";
import httpClients from "./httpClients";

const apiGetInvoice = () => {    
  return new Promise((resolve, reject) => {
    httpClients.mainService
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
    httpClients.mainService
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