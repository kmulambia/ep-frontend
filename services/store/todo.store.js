import { db } from "../services/database/index.db"

export default class useTodoStore {
    get = async (id) => {
        try {
            if (id == null) {
                return await db.Todo.orderBy("id").toArray();
            } else {
                return await db.Todo.get(Number(id));
            }
        } catch (error) {
            throw error;
        }
    };

    count = async () => {
        try {
            return db.Todo.count();
        } catch (error) {
            throw error;
        }
    };

    create = async (data) => {
        try {
            return db.Todo.add(data);
        } catch (error) {
            throw error;
        }
    };

    update = async (data) => {
        try {
            return db.Todo.update(data.id, data);
        } catch (error) {
            throw error;
        }
    };

    remove = async (id) => {
        try {
            return db.Todo.delete(Number(id));
        } catch (error) {
            throw error;
        }
    };

    clean = async (id) => {
        try {
            return db.Todo.clear();
        } catch (error) {
            throw error;
        }
    };
}
