module.exports = require('mongoose').connect(process.env.MONGODB_URI || 'mongodb://localhost/memeMonarch_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
