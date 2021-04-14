const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')

//I want everything in the website to be open to view including viewing other peoples' content. The only locked routes will be for making new posts and upvoting/downvoting

//                        Locked
//   shweta
// jose's edit
// crowns shouldn't be part of the body because then a user could give themselves however much crowns they want instead of them being given by other users
router.post('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.create({
    title: req.body.title,
    body: req.body.body,
    author: req.user._id,
    // crowns: req.body.crowns
    // postDate: Date.now
  })
    .then(post => {
      User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
        .then(() => {
          res.json({
            id: post._id,
            title: post.title,
            body: post.body,
            postDate: post.postDate,
            author: req.user
          })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})


//                         Unlocked
//    Shweta
//jose's edit
//made it so you don't have to be logged in to see posts
router.get('/posts', (req, res) => {
  Post.find({})
    .populate('author')
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

//search function
//  jose
router.get('/posts/search/:title', (req, res) => {
  Post.find({ title: { "$regex": req.params.title, "$options": "i" }}).exec(function (err, data) {
    if (err) { console.log(err) }
    res.json(data)
  })
})




module.exports = router