import axiosInstance from './axios';

class OrderApi {
  constructor() {
    this.basePath = 'api/v1/order';
  }

  request(method, url, data) {
    return new Promise((resolve, reject) => {
      axiosInstance[method](`${this.basePath}${url}`, data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  }

  CreateOrder(data) {
    console.log({ data });
    return this.request('post', '/', data);
  }

  GetOneOrder(id) {
    return this.request('get', `/${id}`);
  }
  PayOrder(id, data) {
    return this.request('patch', `/${id}/pay`, data);
  }
  GetMyOrders() {
    return this.request('get', `/mine`);
  }
  GetAllOrders() {
    return this.request('get', `/orders`);
  }
  DeleteOrder(id) {
    return this.request('delete', `/${id}`);
  }


  PatchStatus(id, data) {
    return this.request('patch', `/${id}`, data);
  }
}

export const orderApi = new OrderApi();
