const router = require('express').Router()
//enter the model names in the { }
const { Post } = require('../models')
const passport = require('passport')

//I want everything in the website to be open to view including viewing other peoples' content. The only locked routes will be for making new posts and upvoting/downvoting

//                        Locked

router.post('/posts', passport.authenticate('jwt'), (req, res) => {
  //replace Post with appropriate modelname
  //There is going to be an image thing in the req aswell
  Post.create({
    title: req.body.title,
    body: req.body.body,
    //image: req.body.image?
    author: req.user._id
  })
  .then(post => {
      User.findbyIdAndUpdate(req.user._id, {$push: {posts: post_id } })
      .then(()=>{
        res.json({
          id: post._id,
          title: post.title,
          body: post.body,
          //image: post.image,
          author: req.user
        })
      })
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})

//                        Unlocked

router.get('/posts', (req, res) =>{
  Post.find({})
    .then(posts => res.json(posts))
    .catch(err=> console.log(err))
})

router.get('/posts/:uid', (req, res ) => {
  Post.find(req.params.uid)
    .then(posts => res.json)
})
//exported

module.exports = router