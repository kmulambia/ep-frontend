import RoleService from "../api/role.api";
import cookie from "js-cookie";
import useCrypto from "../crypto.service";


const cryptoService = new useCrypto();
const roleService = new RoleService();


export default class useRoleStore {

    get = async (id) => {
        if (id) {
            return await roleService.get().then((result => {
                if (result) {
                    return response
                }
            })).catch(error => {
                switch (error.statusCode) {
                    default:
                        throw error.message
                }
            });
        }
        else {
            return await roleService.get(id).then((result => {
                if (result) {
                    return result
                }
            })).catch(error => {
                switch (error.statusCode) {
                    default:
                        throw error.message
                }
            });
        }

    };

    count = async () => {
        return await roleService.count().then((result => {
            if (result) {
                return result
            }
        })).catch(error => {
            switch (error.statusCode) {
                default:
                    throw error.message
            }
        });
    };

    create = async (data) => {
        return await roleService.create(data).then((result => {
            if (result) {
                return result
            }
        })).catch(error => {
            switch (error.statusCode) {
                default:
                    throw error.message
            }
        });
    };

    update = async (data) => {
        return await roleService.update(data).then((result => {
            if (result) {
                return result
            }
        })).catch(error => {
            switch (error.statusCode) {
                default:
                    throw error.message
            }
        });
    };

    remove = async (id) => {
        return await roleService.remove(id).then((result => {
            if (result) {
                return result
            }
        })).catch(error => {
            switch (error.statusCode) {
                default:
                    throw error.message
            }
        });
    };


}
