const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRouter = require('express').Router()
const { request, response } = require('express')
const User = require('../models/user')

userRouter.post('/api/users', async (request, response) => {
  // expects: {first_name, last_name, email, password}

  const body = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    email: body.email,
    first_name: body.first_name,
    last_name: body.last_name,
    passwordHash,
  })

  const createdUser = await user.save()
  response.json(createdUser)
})

userRouter.get('/api/users', async (request, response) => { 
  // List of all users
  const allUsers = await User.find({}).populate('blogs',{ title:1 })
  response.json(allUsers)
})

userRouter.post('/api/login', async (request, response) => {
    // Expects: {email, password}

    const body = request.body
    // Finds the user in the database
    const user = await User.findOne({ email: body.email })
    // Checks if password is correct
    const passCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)
  
    if(! (user && passCorrect) ){
      return response.status(401).json({
        error: 'invalid email or password'
      })
    }
    const userForToken = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: user._id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)
  
    response
      .status(200)
      .send({ 
          token, 
          email: user.email, 
          first_name: user.first_name,
          last_name: user.last_name,
      })
  
})

module.exports = userRouter
