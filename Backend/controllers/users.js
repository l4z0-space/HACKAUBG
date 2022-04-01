const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const { request, response } = require('express')
const User = require('../models/user')


userRouter.post('/api/users', async (request, response) => {
  const info = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(info.password, saltRounds)

  const user = new User({
    username: info.username,
    name: info.name,
    passwordHash,
  })

  const createdUser = await user.save()
  response.json(createdUser)
})

userRouter.get('/api/users', async (request, response) => {
  const allUsers = await User.find({}).populate('blogs',{ title:1 })
  response.json(allUsers)
})

userRouter.post('/api/login', async (request, response) => {
    const body = request.body
    // Finds the user in the database
    const user = await User.findOne({ username: body.username })
    // Checks if password is correct
    const passCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)
  
    if(! (user && passCorrect) ){
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }
    const userForToken = {
      username: user.username,
      id: user._id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)
  
    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  
})

module.exports = userRouter
