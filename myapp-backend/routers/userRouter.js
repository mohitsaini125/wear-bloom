import express from 'express';

import { login, signUp } from '../controller/userController.js';
const userRouter=express.Router();
userRouter.post('/sign',signUp);
userRouter.post('/login',login);
export default userRouter;