import express from 'express';
import * as studentController from '../controllers/studentControllers.js';

const studentRoutes = express.Router();

studentRoutes.get('/all', studentController.fetchAllstudents);
studentRoutes.post('/', studentController.createStudent);
export default studentRoutes;