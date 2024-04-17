const mongoose = require('mongoose');

const schema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
       minLength: 3
   }
});

const Genre = mongoose.model('Genre', schema);
module.exports = Genre;
module.exports.GenreSchema = schema;