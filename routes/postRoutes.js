const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')

//I want everything in the website to be open to view including viewing other peoples' content. The only locked routes will be for making new posts and upvoting/downvoting

//                        Locked
//   shweta

router.post('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.create({
    title: req.body.title,
    body: req.body.body,
    author: req.user._id,
    images: req.body.link,
    tags: req.body.tags
  })
    .then(post => {
      User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
        .then(() => {
          res.json({
            id: post._id,
            title: post.title,
            body: post.body,
            author: req.user,
            images: post.images
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


router.delete('/posts/:id', (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

router.put('/posts/vote/:id', passport.authenticate('jwt'), (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { crowns: req.body.vote })
    .then(() => {
      res.sendStatus(200)
      User.findByIdAndUpdate(req.user._id, {$push : {
        likedHistory: {
          upvoteActive: req.body.upvoteUpdate,
          downvoteActive: req.body.downvoteUpdate,
          postId: req.params.id
        }
      }
    })
      .then(liked => res.json(liked))
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.put('/posts/repeatVote/:id', passport.authenticate('jwt'), (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { crowns: req.body.vote })
  .then(() => {
    User.update({'likedHistory._id' : req.body.vId}, {$set : {
      'likedHistory.$.upvoteActive': req.body.upvoteUpdate,
      'likedHistory.$.downvoteActive' : req.body.downvoteUpdate
    }})
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})

module.exports = router