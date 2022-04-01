require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
const PLAID_SECRET = process.env.PLAID_SECRET
const PLAID_ENVIRONMENT = process.env.PLAID_ENVIRONMENT
const PLAID_CLIENT_NAME = process.env.PLAID_CLIENT_NAME

module.exports = {
  MONGODB_URI,
  PORT,

  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_ENVIRONMENT,
  PLAID_CLIENT_NAME
}
