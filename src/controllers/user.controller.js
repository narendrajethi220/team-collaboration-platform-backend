import { StatusCodes } from "http-status-codes";

import { signInService, signUpService } from "../services/user.service.js"
import { customErrorResponse, internalErrorResponse, successResponse } from "../utils/common/responseObject.js";

export const signUpController = async(req,res) => {
 try {
    const user = await signUpService(req.body);
    return res.status(StatusCodes.CREATED).json(successResponse(user, 'User created successfully'));  
 }
  catch(error){
       console.log("SignUp controller error",error);
       if(error.statusCode){
        return res.status(error.statusCode).json(customErrorResponse(error));
       }
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
  }    
}

export const signInController = async(req,res) => {
   try{
     const user = await signInService(req.body);
     return res.status(StatusCodes.OK).json(successResponse(user, 'User logged in successfully'));
   }
   catch(error){
      console.log('SignIn controller error', error);
      if(error.statusCode){
         return res.status(error.statusCode).json(customErrorResponse(error));
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));

   }
}