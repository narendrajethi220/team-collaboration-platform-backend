import { Router } from "express";

import { signUpController } from "../../controllers/user.controller.js";
import { userSignUpSchema } from "../../validators/userSchema.js";
import { validate } from "../../validators/zod.validator.js";

const userRouter = Router();

userRouter.post('/signup', validate(userSignUpSchema), signUpController);

export default userRouter;