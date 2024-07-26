import axiosInstance from './axios';

class ProfiltApi {
    constructor() {
        this.basePath = '/api/v1/auth/users';
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

    getProfilById(id) {
        return this.request('get', `/${id}`);
    }

    getProfiles() {
        return this.request('get', `/`);
    }

    deleteUser(id) {
        return this.request('delete', `/${id}`);
    }

    activateUser(id, data) {
        return this.request('patch', `/acceptUser/${id}`, data);
    }
}

export const profilApi = new ProfiltApi();
