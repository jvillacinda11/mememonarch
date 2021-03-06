// shweta code
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = require('express').Router()

router.post('/users/register', (req, res) => {
  const { name, email, username } = req.body
  User.register(new User({ name, email, username }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) console.log(err)
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})

router.get('/users', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user)
})

router.post('/users/favorites', passport.authenticate('jwt'), (req, res) => {
  if(req.body._id !== "") {
    if (req.user.favorites.indexOf(req.body._id) === -1) {
      User.findByIdAndUpdate(req.user._id, { $push: { favorites: req.body._id }})
        .then(() => {
          res.sendStatus(200)
        })
    } else {
      User.findByIdAndUpdate(req.user._id, { $pull: { favorites: req.body._id } })
        .then(() => {
          res.sendStatus(200)
        })
    }
  }
})

// router.get('/users/search/:username', (req, res ) =>{
//   User.find({ username: { "$regex": req.params.username, "$options": "i" }}, 'username _id').exec(function (err, data){
//     if (err) console.log(err)
//       res.json(data)
//   })
// })

module.exports = router