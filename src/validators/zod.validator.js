import { StatusCodes } from "http-status-codes";

// import { parseAsync } from "zod";
import { customErrorResponse } from "../utils/common/responseObject.js";

export const validate = (schema) => {
    return async(req,res,next) => { // middleware
       try{
           await schema.parseAsync(req.body);
           next();
       }
       catch(error){
        //    console.log('Validation error in zod validator', error.issues, typeof error.issues);
           let explanation = [];
           let errorMessage = '';
           error.issues.forEach((key)=>{
            explanation.push(key.path[0] + ' ' + key.message);
            errorMessage +=' : ' + key.path[0] + ' ' + key.message;
           })
           return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse({
            message: 'Validation error'+ errorMessage,
            explanation:explanation
           }))
       }
    }
}