import express from "express";
import * as bookController from '../controllers/bookController.js';

const bookRoutes = express.Router();

bookRoutes.get('/all', bookController.fetchAllBooks);
bookRoutes.post('/', bookController.createBook);
bookRoutes.put('/:id', bookController.editBook); 

export default bookRoutes;