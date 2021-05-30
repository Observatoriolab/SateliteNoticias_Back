import express from 'express';
import {addNewUser, loginUser} from '../controllers';

const userRouter = express.Router();
userRouter.post('/login', loginUser);
userRouter.post('/registration', addNewUser);

export default userRouter;