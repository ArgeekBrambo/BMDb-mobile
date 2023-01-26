const User = require('../models/userModel');

class ControllerUser {
    static async create(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body;
            const user = await User.create({ username, email, password, phoneNumber, address });
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async getUsers(req, res, next) {
        try {
            const users = await User.read();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.read(id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.delete(id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ControllerUser