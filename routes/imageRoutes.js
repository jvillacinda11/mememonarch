const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')


router.post('/image', passport.authenticate('jwt'), (req, res) => {
  console.log(req.body)
  // const { name, email, username } = req.body
 User.updateOne({_id:req.user._id}, {$push:{images:req.body.link}})
   .then(image => res.json(image))
   .catch(err => console.log(err))
})

// router.post('/imageposts', passport.authenticate('jwt'), (req, res) => {
//   Post.create({
//     images: req.body.link
//   })
//     .then(post => {
//       User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
//         .then(() => {
//           res.json({

//             images: req.body.link
//           })
//         })
//         .catch(err => console.log(err))
//     })
//     .catch(err => console.log(err))
// })

router.get('/image', passport.authenticate('jwt'), (req, res) => {
  console.log(req.body)
  // const { name, email, username } = req.body
  User.find({_id:req.user._id})
    .then(user => {
      const images = user[0].images
      // console.log(user, images)
      res.json(images)


      } 
      
      )
    .catch(err => console.log(err))
})


router.get('/image/:id', passport.authenticate('jwt'), (req, res) => {
  console.log(req.body)
  // const { name, email, username } = req.body
  User.findOne({ _id: req.user._id })
    .then(user => {
      user=user.images.filter(U=> U!==req.params.id )
      user.save()
      // const images = user.images
      // console.log(user, images)
      res.json(user)


    }

    )
    .catch(err => console.log(err))
})








module.exports = router