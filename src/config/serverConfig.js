import dotenv from 'dotenv'

dotenv.config()

export const serverConfig = {

  PORT: Number(process.env.PORT) || 3030,
  NODE_ENV: process.env.NODE_ENV || 'development',
  PROD_DB_URL: process.env.PROD_DB_URL,
  DEV_DB_URL: process.env.DEV_DB_URL
}
