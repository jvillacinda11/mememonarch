const router = require('express').Router()
// Enter modelname(s) into the { }
const { User } = require('../models')
const passport = require('passport')

//register route

router.post('/users/register', (req, res) => {
  //enter attributes into {} (name, email, etc.)
  const { name, email, username} = req.body
  User.register(new User({name, email, username}), req.body.password, err => {
    if (err) {console.log(err)}
    res.sendStatuts(200)
  })
})

//login route

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if(err) {console.log(err)}
    res.json(user ? jwt.sign({ id : user._id }, process.env.SECRET) : null)
  })
})

router.get('/users/:username', (req, res ) =>{
  User.findById(req.params.username)
  .then(({ user }) =>{
    res.json(user)
  })
})

module.exports = router
