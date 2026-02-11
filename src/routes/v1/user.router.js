import { Router } from "express";

import { signInController, signUpController } from "../../controllers/user.controller.js";
import { userSignInSchema, userSignUpSchema } from "../../validators/userSchema.js";
import { validate } from "../../validators/zod.validator.js";

const userRouter = Router();

userRouter.post('/signup', validate(userSignUpSchema), signUpController);
userRouter.post("/signin",validate(userSignInSchema), signInController);

export default userRouter;