const { getDB } = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

class UserModel {
    static async create({ username, email, password, phoneNumber, address }) {
        try {
            const db = getDB();
            // const hashedPassword = await bcrypt.hash(password, 10);
            const result = await db.collection("Users").insertOne({
                username,
                email,
                password: bcrypt.hashSync(password, 10),
                role: "admin",
                phoneNumber,
                address,
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async read(id) {
        try {
            const db = getDB();
            let result;
            if (id) {
                result = await db
                    .collection("Users")
                    .findOne(
                        { _id: ObjectId(id) },
                        { projection: { password: 0 } }
                    );
            } else {
                result = await db
                    .collection("Users")
                    .find({}, { projection: { password: 0 } })
                    .toArray();
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    // static async update(id, user) {
    //     const db = getDB();
    //     const result = await db
    //     .collection("users")
    //     .updateOne({ _id: ObjectId(id) }, { $set: user });
    //     return result;
    // }

    static async delete(id) {
        try {
            const db = getDB();
            const result = await db
                .collection("Users")
                .deleteOne({ _id: ObjectId(id) });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModel;
