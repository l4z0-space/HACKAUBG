const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const institutionRouter = require('express').Router()
const { request, response } = require('express')
const Institution = require('../models/institution')
const { get_user_from_request } = require('./utils');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

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


institutionRouter.get('/api/institutions', async (request, response) => {
  // expects: {first_name, last_name, email, password}

  const curr_user = await get_user_from_request(request)
  if (!curr_user) return response.status(401).json({ error:'missing or invalid token' })

  const institution_array = await Institution.find({user_id:curr_user.id,});

  let institution_names = institution_array.map(i=>i.name);
  // for(let i =0; i<institution_array.length;i++){
  //   const i_object = institution_array[i];
  //   const accounts_request = {access_token: i_object.access_token }
  //   const accounts_response = await PLAID_CLIENT.accountsGet(accounts_request);
  //   const institution_id = accounts_response.data.item.institution_id

  //   const institutions_response = await PLAID_CLIENT.institutionsGetById({
  //     institution_id: institution_id,
  //     country_codes:['US']
  //   });
  //   const institution_name = institutions_response.data.institution.name;
  //   institution_names = [...institution_names, institution_name];
  // }



  response.status(200).json(institution_names);

})


institutionRouter.get('/api/allinstitutions', async (request, response) => {
  // expects: {first_name, last_name, email, password}

  
  const institution_array = await Institution.find({});

  response.status(200).json(institution_array);

})


// TO MAKE PLAID CHECK ON NEW TRANSACTIONS 
//   await plaidClient.transactionsRefresh({access_token});


institutionRouter.get('/api/statement-report', async (request, response) => {
  // Expects: {email, password}

  const curr_user = await get_user_from_request(request)
  if (!curr_user) return response.status(401).json({ error:'missing or invalid token' })
    
  
  const institution_array = await Institution.find({user_id:curr_user.id});
  let transaction_array = [];
  
  for(let i=0;i<institution_array.length;i++){
    const i_object = institution_array[i]
    const transaction_request = {
      access_token: i_object.access_token,
      start_date: '2021-01-01',
      end_date: '2022-01-01'
    }
    const transactions_res = await PLAID_CLIENT.transactionsGet(transaction_request);
    console.log(transactions_res.data.total_transactions);
    const total_transactions = transactions_res.data.transactions;
    try{

      // console.log(transactions_res.data.total_transactions);
      const t_array = transactions_res.data.transactions.map(t => {
          return{
            amount: t.amount,
            currency: t.iso_currency_code,
            date: t.date,
            merchant_name: t.merchant_name,
            payment_channel: t.payment_channel,
            category: t.category[0],
            institution: i_object.name
          }
      })
      // console.log('arr', t_array.length);
      transaction_array = [...transaction_array, ...t_array]
    
    }catch(err){
      console.log(transactions_res);
    }
    

  
    // transaction_array = [...transaction_array, total_transactions.map(t => {
    //   return{
    //     amount: t.amount,
    //     currency: t.iso_currency_code,
    //     date: t.date,
    //     merchant_name: t.merchant_name,
    //     payment_channel: t.payment_channel,
    //     category: t.category[0],
    //     institution: i_object.name
    //   }
    // })]
  }
  

  // console.log(transactions.data);

  // response.status(200).json(transactions.data)
  response.status(200).json(transaction_array)

})




module.exports = institutionRouter
