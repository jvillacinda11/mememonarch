const { model, Schema } = require('mongoose')
//image might go into post? I still don't know

const Post = new Schema({
  title: String,
  body: String,
  crowns: {
    type: Number,
    default: 0
  },
  postDate: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [{
    type: String,
    default: null
  }],
  created:{type: Date, default: Date.now}
})

module.exports = model('Post', Post)