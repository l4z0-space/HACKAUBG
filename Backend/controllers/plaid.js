const plaidRouter = require('express').Router()
const { request, response } = require('express')
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const { get_user_from_request } = require('./utils');
const Institution = require('../models/institution')


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

plaidRouter.post('/api/plaid/link', async (request, response) => { 
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



plaidRouter.post('/api/plaid/link-institution', async (request, response) => { 
  /*
      This actions links the account with a instituion
      from the Plaid API using the API custom modal 
      and then saves the institution in our database
  */

  const curr_user = await get_user_from_request(request)
  if (!curr_user) return response.status(401).json({ error:'missing or invalid token' })


  const public_token = request.body.public_token;
  const access_request = {public_token};
  
  try{
    const {data} = await PLAID_CLIENT.itemPublicTokenExchange(access_request);
    
    const access_token = data.access_token;

    // Retrieve accounts
    const accounts_request = {access_token}
    const accounts_response = await PLAID_CLIENT.accountsGet(accounts_request);
    const institution_id = accounts_response.data.item.institution_id

    

    const institutions_response = await PLAID_CLIENT.institutionsGetById({
      institution_id: institution_id,
      country_codes:['US']
    });

    const institution = new Institution({
      name: institutions_response.data.institution.name,
      access_token: access_token,
      item_id: institution_id,
      user_id: curr_user.id,
      institution_id: institution_id,
    })
    const created_institution = await institution.save();
    curr_user.institutions = [...curr_user.institutions, created_institution.id]
    await curr_user.save()

    response.status(201).json({'created_institution': created_institution})
    
  }catch(err){
    console.log(err);
    response.status(400).json({'message': 'error with getting access key'})
  }
  
  
  // const response = await 
})
  

module.exports = plaidRouter
