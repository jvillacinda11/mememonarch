const router = require('express').Router()
// Enter modelname(s) into the { }
const { } = require('../models')
const passport = require('passport')

//register route

router.post('/users/register', (req, res) => {
  //enter attributes into {} (name, email, etc.)
  const { } = req.body
  User.register(new User({name, email, username}), req.body.password, err => {
    if (err) {console.log(err)}
    res.sendStatuts(200)
  })
})

//login route

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if(err) {console.log(err)}
    res.json
  })
})

module.exports = router
