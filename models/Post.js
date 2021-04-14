const { model, Schema } = require('mongoose')
//image might go into post? I still don't know

const Post = new Schema({
  title: String,
  body: String,
  crowns: {
    type: Number,
    default: 0
  },
  postDate: Date,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [{
    type: String,
    default: null
  }]
})

module.exports = model('Post', Post)