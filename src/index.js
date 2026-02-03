import express from 'express'
import { StatusCodes } from 'http-status-codes'

import connectDB from './config/dbConfig.js'
import { serverConfig } from './config/serverConfig.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    message: 'PONG'
  })
})

app.listen(serverConfig.PORT, () => {
  console.log(`Server is listening on PORT ${serverConfig.PORT}`)
  connectDB();
})
