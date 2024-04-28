const mongoose = require('mongoose');

const mongoUri = 'mongodb://buse:123456@mongo-db-service:27017/blog_db?directConnection=true&authSource=admin';

mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 5000
});

module.exports = mongoose;