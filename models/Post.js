const { model, Schema } = require('mongoose')
//image might go into post? I still don't know

const Post = new Schema({
  title: String,
  body: String,
  crowns: {
    type: Number,
    default: 0
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  images: String,
  tags: [{
    type: String,
    default: null
  }],
  comments: [{                         //shweta added 05/21
    type: String,                      //type: Schema.Types.ObjectId,
    default: null                      // ref: 'Comment'
    }],
  //shweta added
  created:{type: Date, default: Date.now}
})

module.exports = model('Post', Post)