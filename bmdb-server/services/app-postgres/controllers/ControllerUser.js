const { User, sequelize } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class ControllerUser {
    static async register(req, res, next) {
        const trans = await sequelize.transaction();
        try {
            const { username, email, password, role, phoneNumber, address } =
                req.body;
            console.log(email);
            const newUser = await User.create({
                username,
                email,
                password,
                role: "admin",
                phoneNumber,
                address,
            }, {
                transaction: trans
            });
            await trans.commit()
            res.status(201).json({username: newUser.username, email: newUser.email, role: newUser.role});
        } catch (error) {
            next(error);
            await trans.rollback()
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw { name: "LoginFailed" };
            }
            const user = await User.findOne({
                where: {
                    email,
                }
            })
            if (!user) {
                throw { name: "LoginFailed" };
            }
            const isValidPassword = bcrypt.compareSync(password, user.password);
            if (!isValidPassword) {
                throw { name: "LoginFailed" };
            } else {
                const access_token = jwt.sign(
                    { id: user.id, email: user.email, username: user.username },
                    process.env.JWT_SECRET
                );
                res.status(200).json({ access_token });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ControllerUser;
