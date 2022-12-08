import axios from 'axios';
const resource = process.env.NEXT_PUBLIC_API + "/users";
import cookie from "js-cookie";
import useCrypto from "../crypto.service";


const cryptoService = new useCrypto();
export default class UserService {


    get(id) {
        if (id == null) {
            return axios
                .get(
                    resource +
                    `?filter={"include": ["role"]}`,
                    {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${cryptoService.decrypt(cookie.get('KENTE'))}`
                        }
                    }
                )
                .then(response => {
                    var result = response.data;
                    return result;
                })
                .catch(error => {
                    if (error.response) {
                        throw error.response.data.error;
                    }
                });
        } else if (id != null) {
            return axios
                .get(
                    resource +
                    `/` +
                    id +
                    `?filter={"include": ["role"]}`,
                    {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${cryptoService.decrypt(cookie.get('KENTE'))}`
                        }
                    }
                )
                .then(response => {
                    var result = response.data;
                    return result;
                })
                .catch(error => {
                    if (error.response) {
                        throw error.response.data.error;
                    }
                });
        }
    };

    create(data) {
        return axios
            .post(resource, JSON.stringify(data),
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cryptoService.decrypt(cookie.get('KENTE'))}`
                    }
                })
            .then(response => {
                var result = response.data;
                return result;
            })
            .catch(error => {
                if (error.response) {
                    throw error.response.data.error;
                }
            });
    };

    count() {
        return axios
            .get(
                resource + `/count` +
                `?filter={"where": {},"include": []} `,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cryptoService.decrypt(cookie.get('KENTE'))}`
                    }
                }
            )
            .then(response => {
                var result = response.data;
                return result;
            })
            .catch(error => {
                if (error.response) {
                    throw error.response.data.error;
                }
            });
    };

    update(data) {
        return axios
            .patch(resource + `/` + data.id, data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cryptoService.decrypt(cookie.get('KENTE'))}`
                }
            })
            .then(response => {
                var result = response.data;
                return result;
            })
            .catch(error => {
                if (error.response) {
                    throw error.response.data.error;
                }
            });
    };

    remove(id) {
        return axios
            .delete(resource + `/` + id, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cryptoService.decrypt(cookie.get('KENTE'))}`
                }
            })
            .then(response => {
                var result = response.data;
                return result;
            })
            .catch(error => {
                if (error.response) {
                    throw error.response.data.error;
                }
            });
    };

    signin(data) {
        return axios
            .post(resource + `/sign-in`, { email: data.email, password: data.password })
            .then(response => {
                var result = response.data;
                return result;
            })
            .catch(error => {
                if (error.response) {
                    throw error.response.data.error;
                }
            });
    };

    signup(data) {
        return axios
            .post(resource + `/sign-up`, data, {
                validateStatus: function (status) {
                    return status >= 200 && status < 400
                }
            })
            .then(response => {
                var result = response.data;
                return result;
            })
            .catch(error => {
                throw error.response.data.error;
            });
    };

    forgotPassword(data) {
        return axios
            .post(resource + `/forgot-password`, data)
            .then(response => {
                var result = response.data;
                return result;
            })
            .catch(error => {
                if (error.response) {
                    throw error.response.data.error;
                }
            });
    };

    resetPassword(data) {
        return axios
            .post(resource + `/reset-password`, data)
            .then(response => {
                var result = response.data;
                return result;
            })
            .catch(error => {
                if (error.response) {
                    throw error.response.data.error;
                }
            });
    };

    changePassword(data) {
        return axios
            .patch(resource + `/change-password`, data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cryptoService.decrypt(cookie.get('KENTE'))}`
                }
            })
            .then(response => {
                var result = response.data;
                return result;
            })
            .catch(error => {
                if (error.response) {
                    throw error.response.data.error;
                }
            });
    };

    ping() {
        return axios
            .get(resource + `/ping`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cryptoService.decrypt(cookie.get('KENTE'))}`
                }
            })
            .then(response => {
                var result = response.data;
                return result;
            })
            .catch(error => {
                if (error.response) {
                    throw error.response.data.error;
                }
            });
    }
}