const Book = require('../models/books')
const sequelize = require('../utils/database');

exports.getBooks = async (req, res, next) => {
    try {
        const bookDetails = await Book.findAll();
        res.status(200).send({
            success: true,
            msg: "Successfully GET",
            data: bookDetails
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            msg: "Internal Server Error",
        });
    };
}

exports.addBook = async (req, res, next) => {
    try {
        const name = req.body.name;
        const author = req.body.author;
        const price = req.body.price;
        const description = req.body.description;
        var decodedToken = req.decoded;
        console.log("id: ", decodedToken.id);
        await sequelize.transaction(async (t) => {
            await Book.create({
                name: name,
                author: author,
                price: price,
                description: description,
                userId: decodedToken.id
            }, { transaction: t });

            // console.log("value: ", user);
            res.status(201).send({
                success: true,
                msg: "Successfully Added",
            });
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            msg: err,
        });
    };
}

exports.getBook = async (req, res, next) => {
    try {
        const id = req.params.bookId;
        const bookDetails = await Book.findByPk(id);
        if (bookDetails) {
            res.status(200).send({
                success: true,
                msg: "Successfully GET",
                data: bookDetails
            });
        } else {
            res.status(500).send({
                success: false,
                msg: "No such records",
            });
        }
    } catch (err) {
        res.status(500).send({
            success: false,
            msg: "Internal Server Error",
        });
    };
}

exports.updateBook = async (req, res, next) => {
    try {
        const id = req.params.bookId;
        var decodedToken = req.decoded;
        console.log("id: ", decodedToken.id);
        await sequelize.transaction(async (t) => {
            const bookDetails = await Book.findByPk(id);
            if (bookDetails) {
                if (bookDetails.userId === decodedToken.id) {
                    const bookDetails = await Book.update(req.body,
                        { where: { id: id } },
                        { transaction: t });
                    console.log("value: ", bookDetails);
                    res.status(201).send({
                        success: true,
                        msg: "Successfully Updated",
                    });
                } else {
                    res.status(401).send({
                        success: false,
                        msg: "Permission denied",
                    });
                }

            } else {
                res.status(404).send({
                    success: false,
                    msg: "No such records",
                });
            }

        });
    } catch (err) {
        res.status(500).send({
            success: false,
            msg: "Internal Server Error",
        });
    };
}

exports.deleteBook = async (req, res, next) => {
    try {
        const id = req.params.bookId;
        var decodedToken = req.decoded;
        console.log("id: ", decodedToken.id);
        await sequelize.transaction(async (t) => {
            const bookDetails = await Book.findByPk(id);
            if (bookDetails) {
                if (bookDetails.userId === decodedToken.id) {
                    const bookDetails = await Book.destroy(
                        { where: { id: id } },
                        { transaction: t });
                    console.log("value: ", bookDetails);
                    res.status(201).send({
                        success: true,
                        msg: "Successfully Deleted",
                    });
                } else {
                    res.status(401).send({
                        success: false,
                        msg: "Permission denied",
                    });
                }
            } else {
                res.status(401).send({
                    success: false,
                    msg: "No such records",
                });
            }
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            msg: "Internal Server Error",
        });
    };
}