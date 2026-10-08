import * as bookService from '../services/bookService.js';

export const fetchAllBooks = async (request, response) => {
    try {
        const books = await bookService.fetchAllBooks();
        response.status(200).json(books);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
export const createBook = async (req, res) =>{
    const {name, author} = req.body;
    const book = {name, author};

    try{
        const bookId = await bookService.createBook(book);
        res.status(200).json({
            success: true,
            message: bookId
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            error: "Internal server Error"
        });
    }
}