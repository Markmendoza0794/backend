import express from 'express';
import * as studentController from '../controllers/studentControllers.js';

const studentRoutes = express.Router();

studentRoutes.get('/all', studentController.fetchAllstudents);
studentRoutes.post('/', studentController.createStudent);
studentRoutes.put('/:id', studentController.editStudent); 
studentRoutes.delete('/:id', studentController.deleteStudent);


export default studentRoutes;