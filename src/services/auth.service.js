// required packages
const Op = require("sequelize").Op;
const jwt = require("jsonwebtoken");
const config = require("../config");

// required models
const User = require("../models/user.model");



module.exports = class AuthService {
    async checkIfUserExists(email, username) {
        return await User.findOne({
            where: { [Op.or]: [{ username }, { email }] },
        });
    }

    async createUser(email, username, password) {
        const user = await User.create({ email, username, password });
    }

    async generateResetToken(email) {
        const user = await User.findOne({ where: { email } });
        if (user) {
            const token = jwt.sign({ id: user.id }, config.app.secret, { expiresIn: "6h" });
            await user.update({ resetToken: token });
            // const msg = {
            //     to: user.email,
            //     from: config.sendgrid.sender,
            //     subject: "Nodejs Streaming site reset password",
            //     text: "Click the link to reset your password",
            //     html: `<a href="${config.app.url}/reset/${token}" >click here to reset your password</a>`,
            // };
            // mailer.send(msg);
            console.log(token)
        }
    }

    async verifyResetToken(token) {
        try {
            const data = jwt.verify(token, config.app.secret);
            const user = await User.findOne({ where: { id: data.id } });
            if (token == user.resetToken) {
                return user
            }
        } catch (err) {
            return false
        }
        return false
    }
}