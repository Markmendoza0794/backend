import * as usercontroller from '../controllers/usercontrollers.js';
import express from 'express';

const userrouter = express.Router();

userrouter.post('/new', usercontroller.createaccount);
userrouter.post('/login', usercontroller.login);

export default userrouter;