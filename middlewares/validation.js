const { check, param, validationResult } = require('express-validator');
var lodash = require('lodash');

//USER
exports.user_validators = [
    check('username').not().isEmpty().withMessage("Username is required"),
    check('password').not().isEmpty().withMessage("Password is required")
]

exports.book_validators = [
    check('name').not().isEmpty().withMessage("Book name is required"),
    check('author').not().isEmpty().withMessage("Author name is required"),
    check('description').not().isEmpty().withMessage("Description is required"),
    check('price').not().isEmpty().withMessage("Price is required").isNumeric().withMessage("Price should be numeric"),
]

exports.bookId_validators = [
    check('bookId').not().isEmpty().withMessage("ID is required"),
]



//This function will make an array of error messages
exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    const ap = errors.array();
    // console.log(ap);
    if (!errors.isEmpty()) {
        const err = lodash.map(errors.mapped(), 'msg');
        console.log(err);
        res.status(400).send({
            success: false,
            msg: err,
            validate: true
        });
    } else {
        next();
    }
};