import { Router } from "express";

import { signUpController } from "../../controllers/user.controller.js";

const userRouter = Router();

userRouter.post('/signup', signUpController);

export default userRouter;