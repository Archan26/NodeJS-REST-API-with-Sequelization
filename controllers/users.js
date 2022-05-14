const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hiddenMessage = require('../middlewares/hiddenMessage');
const User = require('../models/users')
const sequelize = require('../utils/database');

exports.signup = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 5)
        await sequelize.transaction(async (t) => {
            await User.create({
                username: username,
                password: hashedPassword,
            }, { transaction: t });

            // console.log("value: ", user);
            res.status(201).send({
                success: true,
                msg: "Successfully SignUP",
            });
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            msg: err,
        });
    };
}

exports.login = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const userDetails = await User.findOne({ where: { username: username } });
        let isEqual = await bcrypt.compare(password, userDetails.password);
        if (!isEqual) {
            res.status(401).send({
                success: false,
                msg: 'Incorrect Username or Password'
            });
        } else {
            console.log(userDetails.id)
            let token = jwt.sign({
                username: username,
                id: userDetails.id
            },
                hiddenMessage.userSecret, {
                expiresIn: '24h' // expires in 24 hours
            });
            res.status(200).send({
                success: true,
                msg: "Successfully Login",
                token: token
            });
        }
    } catch (err) {
        res.status(500).send({
            success: false,
            msg: err,
        });
    };
}

