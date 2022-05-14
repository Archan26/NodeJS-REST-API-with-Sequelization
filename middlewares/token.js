let jwt = require('jsonwebtoken');
const mssg = require('./hiddenMessage');


//This function will check token is valid or not!
let checkToken = async (req, res, next) => {
    const token = await req.headers.token;
    // console.log(token);
    var decodedToken = jwt.decode(token);
    // console.log(decodedToken)
    if (token && "id" in decodedToken) {
        jwt.verify(token, mssg.userSecret, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: err
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

module.exports = {
    checkToken: checkToken
}