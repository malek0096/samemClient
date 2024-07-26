import axiosInstance from './axios';

class ProductApi {
  constructor() {
    this.basePath = '/api/v1/product';
    this.config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  }

  request(method, url, data, config) {
    return new Promise((resolve, reject) => {
      axiosInstance[method](`${this.basePath}${url}`, data, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  }
  Getoptions() {
    return this.request('get', '/options');
  }
  GetProducts(designerId) {
    return this.request('get', '/designer/' + designerId);
  }

  GetOneProduct(id) {
    return this.request('get', `/${id}`);
  }

  AddProduct(designerId, data) {
    return this.request('post', `/${designerId}/add`, data, this.config);
  }

  UpdateProduct(designerId, id, data) {

    return this.request('patch', `/${id}/designer/${designerId}`, data, this.config);
  }

  DeleteProduct(id, designerId) {
    return this.request('delete', `/${id}`);
  }
  DeleteProductImage(id, data) {
    return this.request('patch', `/${id}/image`, data);
  }
  GetClientProducts() {
    return this.request('get', `/client/Products`);
  }
  GetClientOneProduct(id) {
    return this.request('get', `/client/${id}`);
  }
  GetCategories() {
    return this.request('get', `/categories/client/`);
  }
  GetSearchProducts(data) {
    return this.request('get', `/samem/search?page=${data.page}&query=${data.query}&category=${data.category}&price=${data.price}&sort=${data.sort}&brand=${data.brand}&size=${data.size}`);
  }
  getRelatedProducts(id) {
    return this.request('get', `/relatedProducts/${id}`);
  }

  GetProductsByUserId(id) {
    return this.request('get', `/Products/${id}`);
  }




  activateProduct(id) {
    return this.request('patch', `/${id}/activate`, { isActive: true });
  }

  DeleteProductById(id) {
    return this.request('delete', `/${id}}`);
  }
}

export const productApi = new ProductApi();