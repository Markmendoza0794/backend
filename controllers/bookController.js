
import * as bookService from '../services/bookService.js';

// READ
export const fetchAllBooks = async (req, res) => {
    try {
        const books = await bookService.fetchAllBooks();

        res.status(200).json(books);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// CREATE
export const createBook = async (req, res) => {
    try {
        const { name, author } = req.body || {};

        if (!name || !author) {
            return res.status(404).json({
                error: 'Book not found'
            });
        }

        const book = { name, author };

        const bookId = await bookService.createBook(book);

        res.status(200).json({
            success: true,
            message: bookId
        });

    } catch (e) {
        console.log(e);

        res.status(e.statusCode || 500).json({
            error: e.message
        });
    }
};

// UPDATE
export const editBook = async (req, res) => {
    try {
        const { name, author } = req.body || {};
        const { id } = req.params;

        if (!name || !author) {
            return res.status(404).json({
                error: 'Book not found'
            });
        }

        const book = {
            id: parseInt(id),
            name,
            author
        };

        const updatedBook = await bookService.updateBook(book);

        res.status(200).json({
            success: true,
            message: updatedBook
        });

    } catch (e) {
        console.log(e);

        res.status(e.statusCode).json({
            error: e.message
        });
    }
};

// DELETE
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBook = await bookService.deleteBook(parseInt(id));

        if (deletedBook === 0) {
            return res.status(404).json({
                error: 'Book not found'
            });
        }

        res.status(200).json({
            success: true,
            message: deletedBook
        });

    } catch (e) {
        console.log(e);

        res.status(e.statusCode).json({
            error: e.message
        });
    }
};
