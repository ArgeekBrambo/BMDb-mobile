const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const servicePostgres = "http://localhost:4002";
const serviceMongoDb = "http://localhost:4001";

class ControllerUser {
    static async getAll(req, res, next) {
        try {
            let cacheUsersData = await redis.get("users:data");
            if (cacheUsersData) {
                return res.status(200).json(JSON.parse(cacheUsersData));
            }
            const userResponse = await axios.get(`${serviceMongoDb}/user`);

            await redis.set("users:data", JSON.stringify(userResponse.data));

            res.status(200).json(userResponse.data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async addUser(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } =
                req.body;

            const newUser = await axios.post(`${serviceMongoDb}/user`, {
                username,
                email,
                password,
                phoneNumber,
                address,
            });

            await redis.del("users:data");

            res.status(201).json(newUser.data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async populateForm(req, res, next) {
        try {
            const { _id } = req.params;
            const userResponse = await axios.get(
                `${serviceMongoDb}/user/${_id}`
            );
            res.status(200).json(userResponse.data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { _id } = req.params;
            const userDeleteResponse = await axios.delete(
                `${serviceMongoDb}/user/${_id}`
            );
            await redis.del("users:data");
            res.status(200).json(userDeleteResponse.data);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = ControllerUser;
