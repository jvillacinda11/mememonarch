const router = require('express').Router()
const { Comment, Post, User } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.get('/comments', (req, res) => {
  Comment.find({})
    // .populate('author')
    .then(comments => res.json(comments))
    .catch(err => console.log(err))
})

// module.exports = router