const { model, Schema } = require('mongoose')
//image might go into post? I still don't know

const Post = new Schema({
  title: String,
  body: String,
  crowns: Number,
  postDate: Date,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Post', Post)