import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import { serverConfig } from "../config/serverConfig.js";
import userRepository from "../repositories/user.repository.js";
import { customErrorResponse, internalErrorResponse } from "../utils/common/responseObject.js";


export const isAuthenticated = async (req,res, next) => {
 try{
    console.log("req.headers", req.headers);    
    const token = req.headers["x-access token"];
        if(!token){
            return res.status(StatusCodes.FORBIDDEN).json(customErrorResponse({
            explanation: 'Invalid data sent from the client',
            message : 'No auth token provided',
         }))
  }

const response = jwt.verify(token, serverConfig.JWT_SECRET_KEY);

if(!response) {
    return res.status(StatusCodes.FORBIDDEN).json(customErrorResponse({
      explanation: 'Invalid data sent from the client',
      message: 'Invalid auth token provided'
    })
  )
 }
  
 const user = await userRepository.getById(response.id);
 req.user = user.id();
 next();
 
}
catch(error){
    console.log('Auth Middleware error', error);
    if(error.name === 'JsonWebTokenError'){
      return res.status(StatusCodes.FORBIDDEN).json(customErrorResponse({
        explanation: "Invalid data sent from the client",
        message: "Invalid auth token provided"
      }))   
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
}
}

