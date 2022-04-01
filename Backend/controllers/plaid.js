const plaidRouter = require('express').Router()
const { request, response } = require('express')
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const { get_user_from_request } = require('./utils');


const configuration = new Configuration({

    basePath: PlaidEnvironments[process.env.PLAID_ENVIRONMENT],
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
        'PLAID-SECRET': process.env.PLAID_SECRET,
      },
    },
});

const PLAID_CLIENT = new PlaidApi(configuration);

plaidRouter.post('/plaid/link', async (request, response) => { 
    /*
        Here we create the setup page
        for plaid, as we generate the link_token
        and pass it in the template to later
        use it to get the access token
    */

    const curr_user = await get_user_from_request(request)
    if (!curr_user) return response.status(401).json({ error:'missing or invalid token' })
    
    const data = {
        user: {
          client_user_id: curr_user.id,
        },
        client_name: process.env.PLAID_CLIENT_NAME,
        products: ['auth'],
        language: 'en',
        webhook: 'https://webhook.example.com',
        redirect_uri: 'https://hackaubg.herokuapp.com/app',
        country_codes: ['US'],
    
    };
    
    try{
    
        const createTokenResponse = await PLAID_CLIENT.linkTokenCreate(data);
    
        response.status(203).json(
            createTokenResponse.data
        )
    
      } catch (error) {
    
        response.status(400).json(
            {message: 'error generating link token', err: error}
        )
    
      }
    
    // const response = await 
  })
  

module.exports = plaidRouter
