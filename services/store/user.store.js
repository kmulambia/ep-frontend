import UserService from "../api/user.api";
import cookie from "js-cookie";
import useCrypto from "../crypto.service";


const cryptoService = new useCrypto();
const userService = new UserService();


export default class useUserStore {

    getUser = () => {
        return cryptoService.decrypt(cookie.get('RUER'));
    };

    getToken = () => {
        return cryptoService.decrypt(cookie.get('KENTE'));
    };

    getRole = () => {
        return cryptoService.decrypt(cookie.get('BISQN'));
    };

    signin = async (data) => {
        return await userService.signin(data).then((result => {
            if (result) {
                // process result
                var user = result.user;
                var role = result.user.role; delete user.role;
                var acls = result.user.acls; delete user.acls;
                var token = result.token;
                // save result to cookie
                cookie.set('KENTE', cryptoService.encrypt(token.id), { expires: 1 / 24, sameSite: 'lax' });
                cookie.set('RUER', cryptoService.encrypt(user), { expires: 1 / 24, sameSite: 'lax' });
                cookie.set('ANKER', cryptoService.encrypt(acls), { expires: 1 / 24, sameSite: 'lax' });
                cookie.set('BISQN', cryptoService.encrypt(role.name), { expires: 1 / 24, sameSite: 'lax' });
                return role;
            }
        })).catch(error => {
            throw error

        });

    };

    signup = async (data) => {
        return await userService.signup(data).then((result => {
            if (result) {
                return result.data;
            }
        })).catch(error => {
            throw error
        });

    };

    signout = async () => {
        cookie.remove('KENTE');
        cookie.remove('RUER');
        cookie.remove('ANKER');
        cookie.remove('BISQN');
        return true;
    };


    get = async (id) => {
        if (id == null) {
            return await userService.get().then((result => {
                if (result) {

                    var response = result.filter(item => {
                        return item.id != this.getUser().id;
                    });

                    return response
                }
            })).catch(error => {
                throw error
            });
        }
        else {
            return await userService.get(id).then((result => {
                if (result) {
                    return result
                }
            })).catch(error => {
                throw error
            });
        }

    };

    count = async () => {
        return await userService.count().then((result => {
            if (result) {
                return result
            }
        })).catch(error => {
            throw error
        });
    };

    create = async (data) => {
        return await userService.create(data).then((result => {
            if (result) {
                return result
            }
        })).catch(error => {
            throw error
        });
    };

    update = async (data) => {
        return await userService.update(data).then((result => {
            if (result) {
                return result
            }
        })).catch(error => {
            throw error
        });
    };

    remove = async (id) => {
        return await userService.remove(id).then((result => {
            if (result) {
                return result
            }
        })).catch(error => {
            throw error
        });
    };

    forgotPassword = async (data) => {
        return await userService.forgotPassword(data).then((result => {
            if (result) {
                return result
            }
        })).catch(error => {
            throw error
        });
    };

    resetPassword = async (data) => {
        return await userService.resetPassword(data).then((result => {
            if (result) {
                return result
            }
        })).catch(error => {
            throw error
        });
    };


    changePassword = async (data) => {
        return await userService.changePassword(data).then((result => {
            if (result) {
                return result
            }
        })).catch(error => {
            throw error
        });
    };

}
