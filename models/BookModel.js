var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema(
  {
    title: {type: String, required: true},
    author: String,
    summary: {type: String, required: true},
    count:Number,
    genre: {type:String,required:true}
  }
);



//Export model
module.exports = mongoose.model('Book', BookSchema);