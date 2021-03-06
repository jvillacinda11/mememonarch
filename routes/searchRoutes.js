const {User, Post } = require('../models')
const router = require('express').Router()
const passport = require('passport')
//this is to search users by username
router.get('/searchUsers/byId/:id', (req, res) => {
  User.findOne({_id : req.params.id})
  .populate('posts')
  .then(data => res.json(data))
  .catch(err => console.log(err))
  })
//Once the users are displayed then they clickable username  will have the data value of _id and that will be used to to look up their posts with the next route
router.get('/searchPosts/byAuthor/:author', (req, res) => {
  Post.find({author: req.params.author}).exec(function (err, data) {
    if(err) {console.log(err)}
    
    res.json(data)
  })
})

//Search posts by tags
router.get('/searchPosts/byTag/:tag', (req, res) => {
  Post.find({ tags: { $regex: new RegExp(req.params.tag, "i") }})
  .populate('author')
  .then(posts => res.json(posts))
  .catch(err => console.log(err))
})

//search Posts by title
router.get('/searchPosts/byTitle/:title', (req, res)=> {
  Post.find({title: {"$regex": req.params.title, "$options": "i"}})
  .populate('author')
  .then(posts =>  res.json(posts))
  .catch(err => console.log(err))
})

router.get('/searchUsers/likedHistory/:postid', passport.authenticate('jwt'), (req, res) =>{
  User.findOne({_id: req.user._id}).select({likedHistory: {$elemMatch: {postId: req.params.postid}}})
  .then(data => {
    res.json(data)
  })
  .catch(err => console.log(err))
})

module.exports = router