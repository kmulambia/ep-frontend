import axios from 'axios';
const resource = process.env.NEXT_PUBLIC_API + "/roles";
import cookie from "js-cookie";
import useCrypto from "../crypto.service";


const cryptoService = new useCrypto();
export default class RoleService {


    get(id) {
        if (id == null) {
            return axios
                .get(
                    resource,
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
                    id,
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
            .post(resource, data, {
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

}