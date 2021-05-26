const { model, Schema } = require('mongoose')

const User = new Schema({
  name: String,
  email: String,
  upvoteCount: Number,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  likedHistory: [{
    upvoteActive: Boolean,
    downvoteActive: Boolean,
    postId: String
  }],
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
})

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)