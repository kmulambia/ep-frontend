
import LogService from "../api/log.api";

const logService = new LogService();

export default class useLogStore {

    get = async (id) => {
        if (id) {
            return await logService.get().then((result => {
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
            return await logService.get(id).then((result => {
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
        return await logService.count().then((result => {
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
        return await logService.create(data).then((result => {
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
        return await logService.update(data).then((result => {
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

    getByEntityId = async (id) => {
        return await logService.getByEntityId(id).then((result => {
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
