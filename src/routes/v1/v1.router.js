import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const v1Router = Router();

v1Router.get("/users",(req,res)=>{
    return res.status(StatusCodes.OK).json({
        success:true,
        message:"Users"
    })
})

export default v1Router;