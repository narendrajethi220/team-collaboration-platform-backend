import mongoose from "mongoose";

import {serverConfig} from './serverConfig.js';

export default async function connectDB(){
    try{
       if(serverConfig.NODE_ENV === 'development'){
        await mongoose.connect(serverConfig.DEV_DB_URL);

       }
       else if(serverConfig.NODE_ENV === 'production'){
         await mongoose.connect(serverConfig.PROD_DB_URL);
       }
       console.log(`Connected to database from ${serverConfig.NODE_ENV} environment`)
    }
    catch(err){
        console.log('Error while connecting to DB', err.message);
    }

}
