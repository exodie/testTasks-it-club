import { Router } from 'express';
import UserController from '../../controllers/userController';

const userRouter = Router();

const methods = new UserController();

userRouter.post('/create', methods.reg); // api/user/create
userRouter.get('/allUser', methods.getAllUser); // api/user/allUser
userRouter.get('/get/:id', methods.getUserById); // api/user/1
userRouter.put('/change/:id', methods.changeUser); // api/user/change/1 (only in insomnia & etc..)
userRouter.delete('/delete/:id', methods.deleteUser); // api/user/delete/1 (only in insomnia)

export default userRouter;