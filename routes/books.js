const express = require('express');
const token = require('../middlewares/token')
const validation = require('../middlewares/validation');
const booksController = require('../controllers/books');

const router = express.Router();

// //GET method for getting all books
router.get('/getBooks', token.checkToken, booksController.getBooks);

//POST method to add new book
router.post('/addBook', token.checkToken, validation.book_validators, validation.validation, booksController.addBook);

// //GET method to get particular book
router.get('/book/:bookId', token.checkToken, validation.bookId_validators, validation.validation, booksController.getBook);

// //PUT method to update particular book details
router.put('/updateBook/:bookId', token.checkToken, validation.book_validators, validation.validation, booksController.updateBook);

// //DELETE method to delete particular book
router.delete('/deleteBook/:bookId', token.checkToken, validation.bookId_validators, validation.validation, booksController.deleteBook);

module.exports = router;
