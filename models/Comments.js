const { model, Schema } = require('mongoose')

const Comment = new Schema({
  comments: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
})

module.exports = model('Comment', Comment)