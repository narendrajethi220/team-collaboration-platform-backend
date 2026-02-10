import bcrypt from 'bcrypt';

import userRepository from "../repositories/user.repository.js";
import User from "../schema/user.schema.js";
import { createJwt } from "../utils/auth.util.js";
import clientError from "../utils/errors/client.error.js";
import ValidationError from "../utils/errors/validation.error.js";

export const signUpService = async (data) => {
    try {
       const newUser = await userRepository.create(data);
       return newUser;
    }
    catch(error){
         console.log("User service error",error);
         if(error.name === 'ValidationError'){
           throw new ValidationError(
            {
                error: error.errors
            },
             error.message
           );
        }
        if(error.code === 11000 || error.cause?.code === 11000){
            throw new ValidationError(
              {
                error:['A user with same email or username already exists']
            },
            'A user with same email or username already exists'
          );
        }

    }

};

export const signInService = async (input) => {

     const user = await userRepository.getByEmail(input.email);
     if(!user){
       throw new clientError({
        message: "Incorrect credentials",
        explanation : "User with email do not exists",
        statusCode: 404
       })
     }
   
   const isPasswordMatch = bcrypt.compareSync(input.password, User.password);
   if(!isPasswordMatch){
     throw new clientError({
      message: "Incorrect credentials",
      explanation: "Incorrect credentials",
      statusCode: 401
     })
   }
   return {
    id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    token: createJwt({id:user._id,email:user.email,username:user.email})
   }
 

}